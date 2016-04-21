var mongoose = require('mongoose');


module.exports = mongoose.model('m_test', {
	title: String,
	uuid: Number
});