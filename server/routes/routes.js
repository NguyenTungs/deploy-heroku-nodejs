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

router.get('/bandwidth', function (req, res) {
  res.sendfile('./client/views/bandwidth.html');
});

router.get('/bandwidthtest', function (req, res) {
  res.sendfile('./client/views/bandwidthtest.html');
});

router.get('/server', function (req, res) {
  res.sendfile('./client/views/server.html');
});

router.get('/client', function (req, res) {
  res.sendfile('./client/views/client.html');
});


router.get('/test', function(req, res){
	res.sendfile('./client/views/test.html');
});

module.exports = router;