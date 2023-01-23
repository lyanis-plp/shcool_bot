const db = require('../config/db_connection');
const {DataTypes} = require('sequelize');

const Sim = db.define('sim', {
	level: DataTypes.STRING,
	 themData: DataTypes.TEXT('long'),
	 imgData: DataTypes.STRING,
	audioData: DataTypes.STRING,
	videoData: DataTypes.STRING
},{
    freezeTableName:true
});

//(async()=>{await db.sync();})();
module.exports = Sim;