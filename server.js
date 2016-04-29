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



app.set('views', path.join(__dirname, 'client/views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

app.use('/', routes);
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/admin', express.static(__dirname + '/html/admin'));
app.use('/html', express.static(__dirname + '/html'));

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

