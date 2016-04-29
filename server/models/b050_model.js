var mongoose = require('mongoose');

var connection = require('../../configurations/database');

module.exports = connection.db.model('b050', {
	bv051: String,
	bv052: String,
	bv053: String,
	bv054: String,
	bv055: String,
	bv056: String,
	qv101: String,
	bl095: Date
});