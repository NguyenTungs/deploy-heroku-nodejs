var Q100 = require('../models/q100_model');
var md5 = require('md5');

module.exports.signup = function(req, res) {

    req.body.qv103 = md5(req.body.qv102);
    var q100 = new Q100(req.body);

    q100.save(function(err, result) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            res.json({ rs: 1, result: result });
        }
        
    });
}

module.exports.login = function(req, res) {

    Q100.find({qv101: req.body.qv101, qv102: req.body.qv102}, function(err, results) {
        req.session.isLogin = true;
        req.session.user = results;
        res.json(results);
    });
}
