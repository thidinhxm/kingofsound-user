const createError = require('http-errors');
const express = require('express');
const path = require('path');
// const paginate = require('express-paginate');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const paginateHelper = require('express-handlebars-paginate')
const indexRouter = require('./components/home/indexRouter');
const productRouter = require('./components/products/productRouter')
const reviewHelper = require('./components/reviews/reviewHelper');
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// register partials
hbs.registerPartials(path.join(__dirname, '/views/partials'));
hbs.registerHelper('paginate', paginateHelper.createPagination);
hbs.registerHelper('createRating', reviewHelper.createRating);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productRouter)

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
