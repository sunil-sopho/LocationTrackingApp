var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');

var sequelize = new Sequelize(process.env.RDS_DB,process.env.RDS_USERNAME,process.env.RDS_PASSWORD,{
    host: process.env.RDS_HOSTNAME,
    dialect: 'mysql',

    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

var Status = sequelize.define('status', {
    uid:{
        type: Sequelize.INTEGER,
    },
    status:{
        type:   Sequelize.ENUM,
        values: ['active','inactive','UNKNOWN']
    },
    lastSyc:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    lat:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lang:{
        type: Sequelize.STRING,
        allowNull: false
    },
    report: {
        type: Sequelize.TEXT
    }
	}, {
    hooks: {
      beforeCreate: (user) => {
        // const salt = bcrypt.genSaltSync();
        user.createTime = new Date.now();
      }
    }    
});


  sequelize.sync()
    .then(() => console.log('Status table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export Status model for use in other files.
module.exports = Status;