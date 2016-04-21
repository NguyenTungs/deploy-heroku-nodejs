var express           = require('express'),
    router 			  = express.Router(),
    demoController    = require('../controllers/test-controller');


//REST API
router.post('/api/meetups', demoController.create);

router.get('/api/meetups', demoController.list);

router.get('/', function (req, res) {
  res.sendfile('./client/views/index.html');
});

router.get('/demo', function (req, res) {
  res.sendfile('./client/views/demo.html');
});


router.get('/test', function(req, res){
	res.sendfile('./client/views/test.html');
});

module.exports = router;