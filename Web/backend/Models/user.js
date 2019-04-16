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

var User = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    permission:{
        type:   Sequelize.ENUM,
        values: ['admin', 'worker', 'web'],
        defaultValue: 'worker'
    },
    uid:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
    // ,social :{
    // 	id :{
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	token : {
    // 		type:Sequelize.STRING,
    // 		allowNull: true
    // 	},
    // 	displayName : {
    // 		type:Sequelize.STRING,
    // 		allowNull:true
    // 	},
    // 	name : {
    // 		type:Sequelize.STRING,
    // 		allowNull :true
    // 	}
    // }
	}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }    
});

User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      }

  sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;