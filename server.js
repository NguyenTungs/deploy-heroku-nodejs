var express = require('express'),
    app = express(),
    //routes = require('./server/routes/routes'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./configurations/config'),
    mysql = require('mysql');

app.set('port', process.env.PORT || 3000);


mongoose.connect(config.config_Mongo.url_mongoose);


//set Routes
app.use(bodyParser());
//app.use('/', routes);
app.use('/js', express.static(__dirname + '/client/js'));

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/client/views/index.html');
});

var server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
