var Test = require('../models/table_test');
var K100 = require('../models/k100_model');

module.exports.create = function(req, res) {

    var test = new Test(req.body);
    var id = '5718a654001e97280e62588f';
    Test.findById(id, function(err, results) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            if (results !== null) {
                results.title = req.body.title;
                results.uuid = req.body.uuid;
                results.save(function(err, result) {
                    if (err) throw err;

                    res.json({ rs: 1, result: result });
                });
            } else {
                test.save(function(err, result) {
                    if (err) {
                        res.json({ rs: 0, result: err });
                    } else {
                        res.json({ rs: 1, result: result });
                    }

                });
            }
        }
    });
}


module.exports.list = function(req, res) {
    Test.find({}, function(err, results) {
        res.json(results);
    });
}

module.exports.edit = function(req, res) {
    var id = req.params.id;
    console.info('id: ', id);
    Test.findById(id, function(err, results) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            res.json({ rs: 1, result: results });
        }
    });
}

module.exports.delete = function(req, res) {
    var id = req.query.id;
    console.info('id: ', id);
    Test.remove({ _id: id }, function(err) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            res.json({ rs: 1 });
        }
    });

}

module.exports.test = function(req, res) {
    Test.find({}, function(err, results) {
        res.json(results);
    });
}

module.exports.insertK100 = function(req, res) {
    var data = {kv101: 'Nguyen Son Tung'}
    var k100 = new K100(data);

    k100.save(function(err, result) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            console.info('success');
        }

    });

}
