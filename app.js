
var express = require('express');


var survey_controller = require('./survey_controller');


var app = express();

app.set('view engine', 'ejs');



// serving public static files such as stylesheets and imgs
app.use('/public', express.static('public'));

// fire function from surveyController
survey_controller(app);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});



app.listen(3000);
console.log('listening port 3000');
