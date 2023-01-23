const db = require('../config/db_connection');
const {DataTypes} = require('sequelize');

const Fraze = db.define('fraze', {
		login: DataTypes.STRING,
		ingfraze: DataTypes.STRING,
		ingtext: DataTypes.STRING,
		rutext: DataTypes.STRING,
		 theame: DataTypes.STRING
},{
    freezeTableName:true
});

//(async()=>{await db.sync();})();
module.exports = Fraze;