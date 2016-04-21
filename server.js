var express = require('express'),
    app = express(),
    routes = require('./server/routes/routes'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    config = require('./configurations/config'),
    mysql = require('mysql');

app.set('port', process.env.PORT || 3000);


mongoose.connect(config.config_Mongo.url_mongoose);

var pool = mysql.createPool(config.config_Mysql);

pool.getConnection(function(err, connection) {
    if (err) {
        connection.release();
        res.json({ "code": 100, "status": "Error in connection database" });
        return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("select * from user", function(err, rows) {
        connection.release();
        if (!err) {
            res.json(rows);
        }
    });

    connection.on('error', function(err) {
        res.json({ "code": 100, "status": "Error in connection database" });
        return;
    });
});


//set Routes
app.use(bodyParser());
app.use('/', routes);
app.use('/js', express.static(__dirname + '/client/js'));


var server = app.listen(app.get('port'), function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
