require('dotenv').config();
const Sequelize = require('sequelize');

module.exports = new Sequelize(
	process.env.BASE, 
	process.env.BASEUSER, 
	process.env.PASSWORD,
  {
		host: process.env.HOST, 
		dialect: process.env.DIALECT
	}
)