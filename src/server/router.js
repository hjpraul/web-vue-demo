var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var ecard = require('./routes/ecard');

var ejs = require('ejs');

var router = express();

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var config = require('../../webpack.config')
/* 编译中间件代理 */
const compiler = webpack(config)
router.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true },
}))

/* 模板设置，express提供页面 */
// router.set('views', path.join(__dirname, 'htmls'));
// router.engine('html', ejs.__express);
// router.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
router.use(logger('dev'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

/* 此处写路由 */
router.use('/', index);
router.use('/users', users);
router.use('/ecard', ecard);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
