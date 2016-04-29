var mongoose = require('mongoose');

var connection = require('../../configurations/database');

module.exports = connection.db01.model('k100', {
	kv101: String
});