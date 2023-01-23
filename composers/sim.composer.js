const sequelize = require('sequelize')
const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()
const Sim = require('../models/avsimModel');



composer.hears('ПОЛЕТ ПО КРУГУ', async (ctx)=>{
	const ind = 1
	 
	try{
		await	ctx.deleteMessage()
		const sim = await	Sim.findOne({ where: { id: ind } })
		await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>${sim.level} Этап #${sim.id}</b>\n\n${sim.themData}`, parse_mode:'HTML'})
		await ctx.replyWithAudio(sim.audioData)
		await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_sim')]]))
			}catch(e){console.log('ПОЛЕТ ПО КРУГУ', e);}
		
		
})



composer.action("next_sim", async (ctx)=>{
	console.log(ctx.callbackQuery.message.text)
	const ind = parseInt(ctx.callbackQuery.message.text)
	const count = await Sim.count({col: 'id'});

	if (ind<count){
	try{
		await	ctx.deleteMessage()
		const sim = await	Sim.findOne({ where: { id: ind+1 } })
		await	ctx.replyWithSticker(process.env.RIGEL,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
		await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>${sim.level} Этап #${sim.id}</b>\n\n${sim.themData}`, parse_mode:'HTML'})
		await ctx.replyWithAudio(sim.audioData,{caption:`${sim.id} этап ${sim.level}`} )
		await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_sim'),Markup.button.callback('Назад','prext_sim')]]))
	}catch(e){console.log('next_sim', e)}
} else{
	try{
		await	ctx.deleteMessage()
		await ctx.replyWithHTML(`Действия закончены`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
	}catch(e){console.log('next_sim', e)}
}
})
composer.action("prext_sim", async (ctx)=>{
	console.log(ctx.callbackQuery.message.text)
	const ind = parseInt(ctx.callbackQuery.message.text)
	if (ind>1){
		try{
				await	ctx.deleteMessage()
				const sim = await	Sim.findOne({ where: { id: ind-1 } })
				await	ctx.replyWithSticker(process.env.RIGEL,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
				await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>${sim.level} Этап #${sim.id}</b>\n\n${sim.themData}`, parse_mode:'HTML'})
				await ctx.replyWithAudio(sim.audioData,{caption:`${sim.id} этап ${sim.level}`} )
				await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_sim'),Markup.button.callback('Назад','prext_sim')]]))
			}catch(e){console.log('next_sim', e)}
	}else{
		try{
				await	ctx.deleteMessage()
				await ctx.replyWithHTML(`Действия закончены`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
			}catch(e){console.log('next_sim', e)}
	} 
})
module.exports = composer