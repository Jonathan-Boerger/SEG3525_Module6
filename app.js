var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var survey_controller = require('./survey_controller');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

// serving public static files such as stylesheets and imgs
app.use('/public', express.static('public'));

// fire function from surveyController
survey_controller(app);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/survey',urlencodedParser, function (req, res) {
    json_data=req.body;
    for (key in json_data) {
        if (key === 'products') {
            for (value in json_data[key]) {
                console.log(`${key} --> ${json_data[key][value]}`)
            }
        }else{
            console.log(`${key} --> ${json_data[key]}`)
        }

    }
});

app.post('/survey_email',urlencodedParser, function (req, res) {


});

app.listen(3000);
console.log('listening port 3000');
