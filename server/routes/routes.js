var express           = require('express'),
    router 			  = express.Router(),
    demoController    = require('../controllers/test-controller'),
    adminController = require('../controllers/admin-controller');


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

router.get('/record', function (req, res) {
  res.sendfile('./client/views/record.html');
});

router.get('/server', function (req, res) {
  res.sendfile('./client/views/server.html');
});

router.get('/client', function (req, res) {
  res.sendfile('./client/views/client.html');
});

/*
	ADMIN
 */

router.get('/admin', function (req, res) {
  if(!req.session.isLogin){
    res.sendfile('./client/views/admin/login.html');
    return;
  }
  
  res.sendfile('./client/views/admin/dashboard.html');

});

router.get('/admin/login', function (req, res) {
  res.sendfile('./client/views/admin/login.html');
});

router.get('/admin/signup', function (req, res) {
  res.sendfile('./client/views/admin/signup.html');
});
router.post('/api_admin/signup_q100', adminController.signup);

router.post('/api_admin/login_q100', adminController.login);



/*
	TEST
 */
router.get('/test', function(req, res){
	res.sendfile('./client/views/test.html');
});

module.exports = router;