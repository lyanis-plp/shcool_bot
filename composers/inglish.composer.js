const sequelize = require('sequelize')
const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()
const Word = require('../models/wordModel');
const Fraze = require('../models/frazeModel');

composer.hears('РЕШАЕМ ТЕСТЫ', ctx=>ctx.scene.enter('goTest'));
composer.hears('СМОТРИМ СЛОВАРЬ', async (ctx)=>{
	try{ctx.deleteMessage()
	
	await	ctx.replyWithSticker(process.env.INGLISHSTICK, 
		Markup.inlineKeyboard( [[Markup.button.callback('СЛОВАРЬ','slov')],
															[Markup.button.callback('СЛЕНГ','sleng')],
															[Markup.button.callback('РАЗГОВОРНЫЙ','spich1')]
														])
		)
	
			}catch(e){console.log('СМОТРИМ СЛОВАРЬ', e);}
		
		
});

composer.hears('СЛУШАЕМ РАДИООБМЕН', (ctx)=>{
		ctx.deleteMessage()
		ctx.replyWithSticker(process.env.RADIOSTICK,
			Markup.inlineKeyboard( [[Markup.button.callback('Радиообмен ПИЛОТА','pilot')],
															[Markup.button.callback('Радиообмен ДИСПЕТЧЕРА','disp')],
															[Markup.button.callback('Диалог ЗНАКОМСТВО','spich')]
														])
														)
		 
});

composer.action("pilot", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const pilot_fraze = await Fraze.findAll({ where: { theame: 'pilot' } })
	await ctx.replyWithSticker(process.env.RADIOSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	      pilot_fraze.forEach(async function(elem){	
					await ctx.replyWithAudio(elem.ingfraze,{caption:`${elem.ingtext}\n\n${elem.rutext}\n\n\n${elem.theame}`});
					 });
	}catch(e){console.log('PILOT RADIO SPITCH', e)}
	 
})
composer.action("disp", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const pilot_fraze = await Fraze.findAll({ where: { theame: 'disp' } })
	await ctx.replyWithSticker(process.env.RADIOSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	      pilot_fraze.forEach(async function(elem){	await ctx.replyWithAudio(elem.ingfraze, 
	 		{caption:`${elem.ingtext}\n\n${elem.rutext}\n\n\n${elem.theame}`});
	 			});

	}catch(e){console.log('PILOT RADIO SPITCH', e)}
	 
})
composer.action("spich", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const pilot_fraze = await Fraze.findAll({ where: { theame: 'Знакомство' } })
	await ctx.replyWithSticker(process.env.RADIOSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	      pilot_fraze.forEach(async function(elem){	await ctx.replyWithAudio(elem.ingfraze, 
	 		{caption:`${elem.ingtext}\n\n${elem.rutext}\n\n\n${elem.theame}`});
	 			});

	}catch(e){console.log('PILOT RADIO SPITCH', e)}
	 
})
composer.action("slov", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const words = await Word.findAll({ where: { login: 'Словарь' } })
	await ctx.replyWithSticker(process.env.INGLISHSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	words.forEach(function(elem){ctx.replyWithHTML(`1. <b>${elem.ingtext}</b> --- <i>${elem.rutext}</i>`)})

	}catch(e){console.log('словарь', e)}
	 
})
composer.action("sleng", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const words = await Word.findAll({ where: { login: 'Сленг' } })
	await ctx.replyWithSticker(process.env.INGLISHSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	words.forEach(function(elem){ctx.replyWithHTML(`1. <b>${elem.ingtext}</b> --- <i>${elem.rutext}</i>`)})

	}catch(e){console.log('сленг', e)}
	 
})
composer.action("spich1", async (ctx)=>{
	try{
	ctx.answerCbQuery();
	ctx.deleteMessage()
	const words = await Word.findAll({ where: { login: 'Разговорный' } })
	await ctx.replyWithSticker(process.env.INGLISHSTICK, Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime().resize());
	words.forEach(function(elem){ctx.replyWithHTML(`1. <b>${elem.ingtext}</b> --- <i>${elem.rutext}</i>`)})

	}catch(e){console.log('сленг', e)}
	 
})



module.exports = composer