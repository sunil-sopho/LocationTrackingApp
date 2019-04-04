var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = require('./ApplicationInstance');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
// var configDB = require('./backend/Models/database.js');
var compression = require('compression');
var _ = require("underscore");
var mainRoutes = require('./backend/routes/MainRoutes');




app.use(logger('dev'));
app.use(compression());
app.use(express.static(path.resolve(__dirname, 'client')));
app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('views', __dirname + '/client/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(cookieParser());

// required for cookie session
app.use(session({ 
key:'user_sid',
secret: 'letthegamebegins',
resave:false,
saveUninitialized:false,
cookie:{
    expires:600000
} 

}));

app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        console.log(req.session.user);
        res.redirect(req.session.user.Role);
    } else {
        next();
    }    
};


app.use('/', mainRoutes);
app.listen(app.get('port'), function () {
    console.log('Application running in port '+ app.get('port'));
});