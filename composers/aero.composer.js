const sequelize = require('sequelize')
const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()
const Aero = require('../models/aeroModel');



composer.hears('АЭРОДИНАМИКА', async (ctx)=>{
	const ind = 1
	try{
			await	ctx.deleteMessage()
			const sim = await	Aero.findOne({ where: { id: ind } })
			if(sim.imgData){await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>Тема #${sim.id}: ${sim.level}</b>`, parse_mode:'HTML'})}else{
				await	ctx.replyWithHTML(`<b>Тема #${sim.id}: ${sim.level}</b>`)
			}
			await ctx.replyWithHTML(`${sim.themData}`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize())
			if(sim.audioData){await	ctx.replyWithAudio(sim.audioData)}
			if(sim.videoData){await	ctx.replyWithVideo(sim.videoData)}
			await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_aero')]]))
	}catch(e){console.log('АЭРОДИНАМИКА', e);}
});



composer.action("next_aero", async (ctx)=>{
	console.log(ctx.callbackQuery.message.text)
	const ind = parseInt(ctx.callbackQuery.message.text)
	const count = await Aero.count({col: 'id'});

	if (ind<count){
	try{
			await	ctx.deleteMessage()
			const sim = await	Aero.findOne({ where: { id: ind+1 } })
			await	ctx.replyWithSticker(process.env.RIGEL)
			if(sim.imgData){await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>Тема #${sim.id}: ${sim.level}</b>`, parse_mode:'HTML'})}else{
				await	ctx.replyWithHTML(`<b>Тема #${sim.id}: ${sim.level}</b>`)
			}
			await ctx.replyWithHTML(`${sim.themData}`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize())
			if(sim.audioData){await	ctx.replyWithAudio(sim.audioData)}
			if(sim.videoData){await	ctx.replyWithVideo(sim.videoData)}
			await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_aero'),Markup.button.callback('Назад','prext_aero')]]))
		}catch(e){console.log('next_aero', e)}
} else{
	try{
		await	ctx.deleteMessage()
		await ctx.replyWithHTML(`Действия закончены`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
	}catch(e){console.log('next_sim', e)}
}
})
composer.action("prext_aero", async (ctx)=>{
	console.log(ctx.callbackQuery.message.text)
	const ind = parseInt(ctx.callbackQuery.message.text)
	if (ind>1){
		try{
				await	ctx.deleteMessage()
				const sim = await	Aero.findOne({ where: { id: ind-1 } })
				await	ctx.replyWithSticker(process.env.RIGEL)
				if(sim.imgData){await	ctx.replyWithPhoto(sim.imgData, {caption:`<b>Тема #${sim.id}: ${sim.level}</b>`, parse_mode:'HTML'})}else{
					await	ctx.replyWithHTML(`<b>Тема #${sim.id}: ${sim.level}</b>`)
				}
				 

				await ctx.replyWithHTML(`${sim.themData}`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize())
				if(sim.audioData){await	ctx.replyWithAudio(sim.audioData)}
				if(sim.videoData){await	ctx.replyWithVideo(sim.videoData)}
				await ctx.replyWithHTML(`${sim.id}`, Markup.inlineKeyboard([[Markup.button.callback('Дальше','next_aero'),Markup.button.callback('Назад','prext_aero')]]))
			}catch(e){console.log('prext_aero', e)}
	}else{
		try{
				await	ctx.deleteMessage()
				await ctx.replyWithHTML(`Действия закончены`,Markup.keyboard([['ПОЛЕТ ПО КРУГУ'],['АЭРОДИНАМИКА'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']  ]).oneTime().resize())
			}catch(e){console.log('prext_aero', e)}
	} 
})
module.exports = composer