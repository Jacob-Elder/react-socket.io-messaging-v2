/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
require('dotenv').config()

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8081 : process.env.PORT;
const app = express();
const util = require('util')
const db = require('./queries.js')

/**************************************************
attach api route logic from queries.js
**************************************************/
var jsonParser = bodyParser.json()
router.get('/messages', db.getAllMessages);
router.post('/messages', jsonParser, db.postMessage);
// router.get('/api/puppies/:id', db.getSinglePuppy);
// router.post('/api/puppies', db.createPuppy);
// router.put('/api/puppies/:id', db.updatePuppy);
// router.delete('/api/puppies/:id', db.removePuppy);

/***************************************************
APPLY APPROPRIATE WEBPACK CONFIGURATIONS
*****************************************************/

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(middleware);
  //prepends /api to the routes
  app.use('/api', router);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


/******************************************************
SET UP SOCKET EVENTS
******************************************************/

var http = require('http').Server(app)
var io = require('socket.io')(http)
var users = []
io.on('connection', function(socket){
  var username;
  
  socket.on('user:join', function(name){
    username = name
    users.push(name)
    io.emit('user:join', name, users)
  })

  socket.on('send:message', function(message){
    io.emit('send:message', message)
  })

  socket.on('disconnect', function(){
    var index = users.indexOf(username)
    if (username !== undefined) {
      users.splice(index, 1)
      io.emit('user:left', username, users)
    }
  })

});

// router.post('/api/v1/messages', function(req, res, next) {
//   const results = []
//   const data = {
//     name: req.body.name,
//     content: req.body.content
//   }
//   pg.connect(connectionString, (err, client, done) => {
//     if (err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err})
//     }
//     client.query('INSERT INTO messages(name, content) values($1, $2)', [data.name, data.content])
//     console.log('message sent to database')
//     res.send('success!')
//   })
// })

http.listen(port)
