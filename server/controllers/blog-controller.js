
var B050 = require('../models/b050_model');



module.exports.listB050 = function(req, res) {
    B050.find({}, function(err, results) {
        res.json(results);
    });
}



module.exports.readB050ById = function(req, res){


    var url = req.protocol + '://' + req.get('host');
	var id = req.params.id;

	B050.findById(id, function(err, results) {
        if (err) {
            res.json({ rs: 0, result: err });
        } else {

            res.render('blogs/post.html',{item: results});
        }
    });
}

