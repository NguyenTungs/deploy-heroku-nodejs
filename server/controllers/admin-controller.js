var Q100 = require('../models/q100_model');
var B050 = require('../models/b050_model');
var slug = require('slug');
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

    Q100.find({ qv101: req.body.qv101, qv102: req.body.qv102 }, function(err, results) {
        req.session.isLogin = true;
        req.session.user = results;
        res.json(results);
    });
}

module.exports.addB050 = function(req, res) {
    if (!req.body.id) {
        console.info('case-insert-');
        req.body.bl095 = new Date();
        req.body.qv101 = req.session.user[0].qv104;
        req.body.bv056 = slug(req.body.bv051.toLowerCase());

        var b050 = new B050(req.body);

        b050.save(function(err, result) {
            if (err) {
                res.json({ rs: 0, result: err });
            } else {
                res.json({ rs: 1, result: result });
            }

        });
    }else{
        var url = req.protocol + '://' + req.get('host');
        var id = req.body.id;

        req.body.bv056 = slug(req.body.bv051.toLowerCase());

        B050.findOneAndUpdate({_id: id}, req.body, function (err, result) {
            if (err) {
                res.json({ rs: 0, result: err });
            } else {
                res.json({ rs: 1, result: result, type: 'edit' });
            }
          
        });
    }


}

module.exports.editB050 = function(req, res) {
    var id = req.params.id;

    B050.findById(id, function(err, results) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            res.render('admin/edit_blog.html', { item: results });
        }
    });
}


module.exports.delB050 = function(req, res) {

    var id = req.body.obj;
    console.info('id: ', id);
    B050.remove({ _id: id }, function(err) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {
            res.json({ rs: 1 });
        }
    });
}
