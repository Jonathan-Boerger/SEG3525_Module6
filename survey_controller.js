// required packages
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');

// This code is maintained unchanged from the sample code of C. Barriere
// read the data file
function readData(fileName){
    let dataRead = fs.readFileSync('./data/' + fileName + '.json');
    let infoRead = JSON.parse(dataRead);
    return infoRead;
}
// This code is maintained unchanged from the sample code of C. Barriere
// read the data file
function writeData(info, fileName){
    data = JSON.stringify(info);
    fs.writeFileSync('./data/' + fileName + '.json', data);
}

// This code is modified from the sample code of C. Barriere
// update the data file, I use "name" to be equal to json data files
// to match with the file names
// I assume we always just add 1 to a single item
function combineCounts(name, value){
    // console.log(value);
    info = readData(name);
    // will be useful for text entry, since the item typed in might not be in the list
    var found = 0;
    for (var i=0; i<info.length; i++){
        if (info[i][name] === value){
            info[i].count = parseInt(info[i].count) + 1;
            found = 1;
        }
    }
    if (found === 0){
        info.push({[name] : value, count: 1});
    }
    writeData(info, name);
}

// This code is modified from the sample code of C. Barriere
// This is the controler per se, with the get/post
module.exports = function(app){
    // This code is modified from the sample code of C. Barriere
    // when a user goes to localhost:3000/analysis
    // serve a template (ejs file) which will include the data from the data files
    app.get('/analysis', function(req, res){
        var inital_impression = readData("inital_impression");
        var comments = readData("comments");
        var products = readData("products");
        var explorability = readData("explorability");
        var previous_access = readData("previous_access");
        var target_audience = readData("target_audience");
        var visually_pleasing = readData("visually_pleasing");


        var survey_rslt ={
            inital_impression: inital_impression,
            comments: comments,
            products: products,
            explorability: explorability,
            previous_access :previous_access,
            target_audience: target_audience,
            visually_pleasing:visually_pleasing
        };

        res.render('survey_results', {survey_rslt: survey_rslt});
        // console.log([initial_impression, comments, products]);
    });



    // when a user goes to localhost:3000/niceSurvey
    // serve a static html (the survey itself to fill in)
    app.get('/survey', function(req, res){
        res.sendFile(__dirname+'/views/survey.html');
    });
    // This code is modified from the sample code of C. Barriere
    // when a user types SUBMIT in localhost:3000/survey
    // the action.js code will POST, and what is sent in the POST
    // will be recuperated here, parsed and used to update the data files
    app.post('/survey',urlencodedParser, function (req, res) {
        json_data=req.body;

        for (key in json_data) {
            if ((key === 'products') && (typeof (json_data[key]) === "object")) {
                for (value in json_data[key]) {
                    console.log(`${key} --> ${json_data[key][value]}`);
                    combineCounts(key, json_data[key][value]);
                }
            }else{
                console.log(`${key} --> ${json_data[key]}`);
                combineCounts(key, json_data[key]);
            }

        }
        res.sendFile(__dirname+'/views/survey.html');
    });


};