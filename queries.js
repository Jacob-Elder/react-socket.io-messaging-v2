var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var config = {
  host: 'localhost',
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

var pgp = require('pg-promise')(options);
var db = pgp(config);

function getAllMessages (req, res, next) {
	db.any('SELECT * FROM messages')
	.then(function(data) {
		// res.status(200).json({
		// 	status: 'success',
		// 	data: data,
		// 	message: 'Got all messages'
		// })
		res.send(data)
	})
	.catch(function (err) {
		return next(err)
	})
}

function postMessage (req, res, next) {
	var name = 'tester'
	var content = 'this is just test text'
	console.log(req.body)
	db.none('insert into messages(name, content)' + 'values(${name}, ${content})'
	).then(function () {
		res.status(200)
		.json({
			status: 'success',
			message: 'message posted'
		})
	})
	.catch(function (err) {
		return next(err)
	})
}

module.exports = {
  getAllMessages: getAllMessages,
  postMessage: postMessage
};