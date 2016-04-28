var express           = require('express'),
    router 			  = express.Router(),
    demoController    = require('../controllers/test-controller'),
    adminController = require('../controllers/admin-controller'),
    blogController = require('../controllers/blog-controller');


//REST API
router.post('/api/meetups', demoController.create);

router.get('/api/meetups', demoController.list);

router.get('/api/edit/:id', demoController.edit);

router.delete('/api/meetups', demoController.delete);

router.get('/', function (req, res) {
  res.sendfile('./client/views/blogs/index.html');
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

router.get('/admin/blog/add_blog', function (req, res) {
  if(!req.session.isLogin){
    res.sendfile('./client/views/admin/login.html');
    return;
  }
  
  res.sendfile('./client/views/admin/add_blog.html');

});

router.get('/admin/blog', function (req, res) {
  if(!req.session.isLogin){
    res.render('admin/login.html');
    return;
  }
  
  res.render('admin/blogs.html');

});

router.get('/admin', function (req, res) {
  if(!req.session.isLogin){
    res.sendfile('./client/views/admin/login.html');
    return;
  }
  

  res.render('admin/dashboard.html',{user: req.session.user});

});

router.get('/admin/login', function (req, res) {
  if(!req.session.isLogin){
    //res.sendfile('./client/views/admin/layouts/header.html');
    res.sendfile('./client/views/admin/login.html');
    //res.sendfile('./client/views/admin/layouts/footer.html');
    return;
  }
  res.sendfile('./client/views/admin/dashboard.html');
});

router.get('/admin/logout', function (req, res) {
  delete req.session.isLogin;
  res.sendfile('./client/views/admin/login.html');
});

router.get('/admin/signup', function (req, res) {
  res.sendfile('./client/views/admin/signup.html');
});




router.post('/api_admin/signup_q100', adminController.signup);

router.post('/api_admin/login_q100', adminController.login);

router.post('/api_admin/add_b050', adminController.addB050);

router.post('/api_admin/del_b050', adminController.delB050);

/*
  BLOGS
 */


router.get('/api_blog/listB050', blogController.listB050);


/*
	TEST
 */
router.get('/test', function(req, res){
	res.sendfile('./client/views/test.html');
});

module.exports = router;