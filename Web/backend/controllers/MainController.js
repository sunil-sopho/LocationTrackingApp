
//  @sunil after view of DB is Final then handle this
var database = require('../Models/db_model');
var Task = require('../Models/task');
var User = require('../Models/user');
var Worker = require('../Models/worker');


var request = require('request');
module.exports = {
    home:home,
    map:map,
    user:user,
    loginPost:loginPost,
    signupPost:signupPost,
    userList : userList,
    userCreate : userCreate
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



function user(req,res){
    res.render('users/users.ejs',{
      message:""
  });
}



function loginPost(req,res){
  res.redirect('/upload')
}

function signupPost(req,res){
  res.redirect('/upload')
}

function userList(req,res){
  console.log("POst req");

  var obj =[];
  User.findAll({attributes: ['name', 'id','permission']})
  .then(function (projects) {

    console.log(projects);
    obj.push({stat:projects});
    res.json(obj);
  }).catch(function(err){
    console.log('Oops! something went wrong, : ', err);
    res.json(obj);
  });
}

function userCreate(req,res){
  User.create({
    id : "armordregol1",
    name: "Sunil",
    password : "password"

  }).catch(function(err){
    console.log('Oops! something went wrong, : ');
    res.status(401).json({err:true});
  });
}

function parseIt(rawData){
    // rawData = JSON.stringify(rawData);
    rawData = JSON.parse(rawData);
    return rawData;
}