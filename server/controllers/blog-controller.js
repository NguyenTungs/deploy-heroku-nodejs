
var B050 = require('../models/b050_model');

module.exports.listB050 = function(req, res) {
    B050.find({}, function(err, results) {
        res.json(results);
    });
}
