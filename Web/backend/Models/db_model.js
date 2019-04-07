  var mysql      = require('mysql');
var connection = mysql.createConnection({
host     : process.env.RDS_HOSTNAME,
user     : process.env.RDS_USERNAME,
password : process.env.RDS_PASSWORD,
database : process.env.RDS_DB,
// port     : process.env.RDS_PORT
});

    
connection.connect(function(err){
    // console.log(err)
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});
module.exports = connection;