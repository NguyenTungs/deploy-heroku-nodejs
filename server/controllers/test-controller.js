var Test = require('../models/table_test');

module.exports.create = function(req, res) {

    var test = new Test(req.body);
    test.save(function (err, result) {
    	res.json(result);
    });
}


module.exports.list = function(req, res){
	Test.find({}, function(err, results){
		res.json(results);
	});
}

module.exports.test = function(req, res){
	Test.find({}, function(err, results){
		res.json(results);
	});
}