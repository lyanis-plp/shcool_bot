const db = require('../config/db_connection');
const {DataTypes} = require('sequelize');

const Word = db.define('word', {
		login: DataTypes.STRING,
		ingtext: DataTypes.STRING,
		rutext: DataTypes.STRING 
},{
    freezeTableName:true
});

//(async()=>{await db.sync();})();
module.exports = Word;