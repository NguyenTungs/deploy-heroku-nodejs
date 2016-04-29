var db = require('mongoose');
var config = require('./config');
db.connect(config.config_Mongo.url_mongoose);

var db01 = db.createConnection(config.config_Mongo_server02.url_mongoose);

exports.db = db;
exports.db01 = db01;