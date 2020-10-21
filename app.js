var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const items_router = require('./routes/items');
const individual_items_sales_router = require('./routes/individual_items_sales');
const pc_making_router = require('./routes/pc_making');
const repairing_router = require('./routes/repairing');
const purchasing_router = require('./routes/purchasing');
const purchasing_credit_router = require('./routes/purchasing_credit');

mongoose.connect('mongodb://localhost:27017/tech-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>  {
  console.log('Connected to Database');
});

mongoose.connection.on('error', () => {
  console.log('Cannot connected to Database');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', cors(), items_router);
app.use('/individual_items_sales', cors(), individual_items_sales_router);
app.use('/pc_making', cors(), pc_making_router);
app.use('/repairing', cors(), repairing_router);
app.use('/purchasing', cors(), purchasing_router)
app.use('/purchasing_credit', cors(), purchasing_credit_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
