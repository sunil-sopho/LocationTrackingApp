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

var Task = sequelize.define('Tasks', {
    coverage:{
        type: Sequelize.INTEGER,
        defaultValue: ()=>{
            return 1;
        },
    },
    taskid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lat:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lang:{
        type: Sequelize.STRING,
        allowNull: false
    },
    taskDiscription:{
        type:Sequelize.STRING
    },
    createTime:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    completeTime:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
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
    .then(() => console.log('Tasks table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Task;