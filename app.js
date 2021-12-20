const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const session = require('express-session');
const flash = require('connect-flash');

const reviewHelper = require('./components/reviews/reviewHelper');
const indexRouter = require('./components/home/indexRouter');
const productRouter = require('./components/products/productRouter');
const userRouter = require('./components/users/userRouter');
const authRouter = require('./components/auth/authRouter');
const cartRouter = require('./components/cart/cartRouter')
const orderRouter = require('./components/order/orderRouter')
const passport = require('./components/auth/passport');
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'layout',
	helpers: {
		paginate: paginateHelper.createPagination,
		createRating: reviewHelper.createRating,
	}
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7
		}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
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
