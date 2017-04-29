var promise = require('bluebird');

var util = require('util')

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
		res.send(data)
	})
	.catch(function (err) {
		return next(err)
	})
}

function postMessage (req, res, next) {
	db.none('INSERT INTO messages(name, content) VALUES($1, $2)', [req.body.user, req.body.text]
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