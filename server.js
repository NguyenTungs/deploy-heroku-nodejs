var express = require('express'),
    app = express(),
    routes = require('./server/routes/routes'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./configurations/config'),
    mysql = require('mysql'),
    http = require('http');

// app.set('port', process.env.PORT || 3000);


mongoose.connect(config.config_Mongo.url_mongoose);

// var pool = mysql.createPool(config.config_Mysql);

// pool.getConnection(function(err, connection) {
//     if (err) {
//         connection.release();
//         res.json({ "code": 100, "status": "Error in connection database" });
//         return;
//     }

//     console.log('connected as id ' + connection.threadId);

//     connection.query("call scurpks_listoftabs200(0,1,0)", function(err, rows) {
//         connection.release();
//         if (!err) {
//             console.info('row--scurpks_listoftabs200-',rows[0][0].PS200);
//             //res.json(rows);
//         }
//     });



//     connection.query("select stdv_tools_stornotabv100(49,'NguyenTung')", function(err, rows) {
//         //connection.release();
//         if (!err) {
//             console.info('row--stdv_tools_stornotabv100-',res.json(rows));
//             //res.json(rows);
//         }
//     });

//     connection.on('error', function(err) {
//         res.json({ "code": 100, "status": "Error in connection database" });
//         return;
//     });
// });

// function serverHandler(request, response) {
//     var uri = url.parse(request.url).pathname,
//         filename = path.join(process.cwd(), uri);

//     var stats;

//     try {
//         stats = fs.lstatSync(filename);
//     } catch (e) {
//         response.writeHead(404, {
//             'Content-Type': 'text/plain'
//         });
//         response.write('404 Not Found: ' + path.join('/', uri) + '\n');
//         response.end();
//         return;
//     }
// }


// //set Routes
// app.use(bodyParser());
// app.use('/', routes);
// app.use('/js', express.static(__dirname + '/client/js'));
// app.use('/html', express.static(__dirname + '/html'));


// var server1 = app.listen(app.get('port'), function() {
//     var host = server1.address().address;
//     var port = server1.address().port;
//     console.log('Example app listening at http://%s:%s', host, port);
// });

// var server = http.createServer(app);
// // var io = require('socket.io').listen(server);  //pass a http.Server instance
// // server.listen(3000);  //listen on port 80

// require('./init-server.js')(server, function(socket) {

// });

var isUseHTTPs = !(!!process.env.PORT || !!process.env.IP);

var server = require(isUseHTTPs ? 'https' : 'http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

function serverHandler(request, response) {
    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

    var stats;

    try {
        stats = fs.lstatSync(filename);
    } catch (e) {
        response.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        response.write('404 Not Found: ' + path.join('/', uri) + '\n');
        response.end();
        return;
    }
}

app.use(bodyParser());

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ secret: 'keyboard cat', key: 'sid' }));

app.use('/', routes);
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/admin', express.static(__dirname + '/html/admin'));
app.use('/html', express.static(__dirname + '/html'));

// var server1 = app.listen(app.get('port'), function() {
//     var host = server1.address().address;
//     var port = server1.address().port;
//     console.log('Example app listening at http://%s:%s', host, port);
// });

var app1;

// if (isUseHTTPs) {
//     var options = {
//         key: fs.readFileSync('/etc/ssl/private/my.kubplayer.com.key'),
//         cert: fs.readFileSync('/etc/ssl/certs/my.kubplayer.com.crt'),
//         ca: fs.readFileSync('/etc/ssl/certs/Intermediate_CA_Bundle.crt')
//     };
//     app = server.createServer(options, serverHandler);
// } else 
app1 = server.createServer(serverHandler);

app1 = app.listen(process.env.PORT || 3000, function() {
    var addr = app1.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});

require('./init-server.js')(app1, function(socket) {});

