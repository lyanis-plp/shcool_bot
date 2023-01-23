const db = require('../config/db_connection');
const {DataTypes} = require('sequelize');

const User = db.define('user', {
	uuid: DataTypes.STRING,
	firstName: DataTypes.STRING,
	lastName: DataTypes.STRING,
	user_name: DataTypes.STRING,
	test_ind: DataTypes.STRING 
},{
    freezeTableName:true
});

//(async()=>{await db.sync();})();
module.exports = User;