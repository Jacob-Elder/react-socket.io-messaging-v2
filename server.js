/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8081 : process.env.PORT;
const app = express();

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

  app.use(middleware);
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
io.on('connection', function(socket){
  var username;
  console.log('connected!')
  
  socket.on('user:join', function(name){
    console.log(name + ' joined')
    username = name
    users.push(name)
    io.emit('user:join', name, users)
  })

  socket.on('send:message', function(message){
    console.log('message sent!')
    io.emit('send:message', message)
  })

  socket.on('disconnect', function(){
    console.log(username + ' left')
    var index = users.indexOf(username)
    users.splice(index, 1)
    if (username !== undefined) {
      io.emit('user:left', {name: username, users: users})
    }
  })

});

http.listen(port)
