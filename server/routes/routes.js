var express           = require('express'),
    router 			  = express.Router(),
    demoController    = require('../controllers/test-controller');


//REST API
router.post('/api/meetups', demoController.create);

router.get('/api/meetups', demoController.list);

router.get('/api/edit/:id', demoController.edit);

router.delete('/api/meetups', demoController.delete);

router.get('/', function (req, res) {
  res.sendfile('./client/views/index.html');
});


router.get('/test', function(req, res){
	res.sendfile('./client/views/test.html');
});

module.exports = router;