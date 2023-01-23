const db = require('../config/db_connection');
const {DataTypes} = require('sequelize');

const Test = db.define('test', {
		login: DataTypes.STRING,
		quest: DataTypes.STRING,
		conwa: DataTypes.STRING,
		unswer1: DataTypes.STRING,
		unswer2: DataTypes.STRING,
		unswer3: DataTypes.STRING,
		unswer4: DataTypes.STRING,
		them: DataTypes.STRING 
},{
    freezeTableName:true
});

//(async()=>{await db.sync();})();
module.exports = Test;