const sequelize = require('sequelize')
const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()
//const Word = require('../models/wordModel')
//const Fraze = require('../models/frazeModel')

composer.hears('АНГЛИЙСКИЙ', async (ctx)=>{
	try{ctx.deleteMessage()
		await	ctx.replyWithSticker(process.env.INGLISHSTICK, 
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
			}catch(e){console.log('АНГЛИЙСКИЙ', e);}})

composer.hears('АВИАСИМ', async (ctx)=>{
	try{ctx.deleteMessage()
			await	ctx.replyWithSticker(process.env.FLYSTICK, 
			Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize())
			}catch(e){console.log('АВИАСИМ', e);}})

composer.hears('БИОЛОГИЯ', async (ctx)=>{
	try{ctx.deleteMessage()
	
	await	ctx.replyWithSticker(process.env.WORDSTICK, 
		Markup.keyboard([['ПАРАГРАФЫ', 'ТЕМАТИКА'],['ТЕСТЫ БИОЛОГИЯ','ТЕСТЫ АНАТОМИЯ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize()
		)
	
			}catch(e){console.log('БИОЛОГИЯ', e);}
		
		
})
composer.hears('ХИМИЯ', async (ctx)=>{
	try{ctx.deleteMessage()
	
	await	ctx.replyWithSticker(process.env.WORDSTICK, 
		Markup.keyboard([['ОРГАНИКА', 'НЕОРГАНИКА'],['ТАБЛИЦА','ВАЛЕНТНОСТЬ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize()
		)
	
			}catch(e){console.log('БИОЛОГИЯ', e);}
		
		
})

 


module.exports = composer