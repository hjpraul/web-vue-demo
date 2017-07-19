#!/usr/bin/env node

var router = require('./router');
var debug = require('debug')('web:server');
var http = require('http');

// 获取端口
var port = normalizePort(process.env.PORT || '3000');
router.set('port', port);
// 创建 HTTP server.
var server = http.createServer(router);
// 端口监听，监听error和listening事件
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// 获取端口号
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// 监听error事件
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// 监听listening事件
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}
