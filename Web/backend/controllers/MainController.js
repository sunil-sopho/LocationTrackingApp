
//  @sunil after view of DB is Final then handle this
var database = require('../Models/db_model');
var database = require('../Models/task');
var database = require('../Models/user');
var database = require('../Models/worker');


var request = require('request');
module.exports = {
    home:home,
    map:map,
    loginPost:loginPost,
    signupPost:signupPost
}

// For login Purpose
function home(req,res){
	res.render('index.ejs',{
      user: req.session.user,
      message:""
	});
}


function map(req,res){
    res.render('status/status.ejs',{

  });
}



// function signup(req,res){
//     res.render('signup/signup.ejs',{
//       message:""
//   });
// }



function loginPost(req,res){
  res.redirect('/upload')
}

function signupPost(req,res){
  res.redirect('/upload')
}

function parseIt(rawData){
    // rawData = JSON.stringify(rawData);
    rawData = JSON.parse(rawData);
    return rawData;
}