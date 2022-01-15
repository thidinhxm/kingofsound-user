const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const paginateHelper = require('express-handlebars-paginate');
const session = require('express-session');
const flash = require('connect-flash');
const {v4: uuidv4} = require('uuid');

const reviewHelper = require('./components/reviews/reviewHelper');
const orderHelper = require('./components/orders/orderHelper');
const productHelper = require('./components/products/productHelper');
const indexRouter = require('./components/home/indexRouter');
const productRouter = require('./components/products/productRouter');
const userRouter = require('./components/users/userRouter');
const authRouter = require('./components/auth/authRouter');
const cartRouter = require('./components/carts/cartRouter')
const orderRouter = require('./components/orders/orderRouter')
const passport = require('./components/auth/passport');
const {createCart, createUnauthUser, updateCartUnauthUser} = require('./components/carts/cartService');
const app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
	extname: 'hbs',
	defaultLayout: 'layout',
	helpers: {
		paginate: paginateHelper.createPagination,
		createRating: reviewHelper.createRating,
		getNumberRating: reviewHelper.getNumberRating,
		getPercentRating: reviewHelper.getPercentRating,
		formatDateTime: reviewHelper.formatDateTime,
		formatPrice: orderHelper.formatPrice,
		paginateCommentList: productHelper.paginateCommentList,
		'pages': function(pages,page,status,block) {
			var accum = '';
			console.log(page);
			for(var i = 1; i < pages+1; ++i)
			if(i!=page+1)
				accum += block.fn({index:i,status:status,active:""});
			else
				accum += block.fn({index:i,status:status,active:"active"});
			return accum;
		},

	}
}))

app.set('view engine', 'hbs');


// app.use(logger('dev'));
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

app.use(async function(req, res, next) {
	try {
		if (!req.user) {
			if (!req.session.unauth_id) {
				req.session.unauth_id = uuidv4();
				req.session.cart = await createCart(null);
				await createUnauthUser(req.session.unauth_id, req.session.cart.cart_id);
			}
			else if (!req.session.cart) {
				req.session.cart = await createCart(null);
				await updateCartUnauthUser(req.session.unauth_id, req.session.cart.cart_id);
			}
		}
		next();
	}
	catch (err) {
		next(err);
	}
});

app.use(function(req, res, next) {
	res.locals.user = req.user;
	res.locals.cart = req.session.cart;
	next();
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
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
