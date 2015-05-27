var path = require('path');

var express = require('express');
var httpProxy = require('http-proxy');

var io = require('socket.io');
// var client = require('socket.io-client');

var proxy = httpProxy.createProxyServer({
  ws: true
});
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'src');

app.use(express.static(publicPath));

// We only want to run the workflow when not in production
if (!isProduction) {

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/config/bundle.js');
  bundle();

  // Any requests to /build is proxied
  // to webpack-dev-server
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

server.listen(port, function () {
  console.log('Server running on port ' + port);
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
