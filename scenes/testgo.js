const {Markup, Composer, Scenes} = require('telegraf');
require('dotenv').config();
const Test = require('../models/testModel');

const startStep = new Composer();
startStep.on("text", async (ctx)=>{
	//console.log("startStep test")
				//ctx.deleteMessage()
				ctx.wizard.state.testGoScene = {}
				try { 
					Test.count().then(c => {ctx.wizard.state.testGoScene.counter = c})
					const test = await Test.findAll({})
					await ctx.replyWithPhoto(process.env.TEST1,{caption:`Можно выбрать нужный тест.`},);
					test.forEach(async function(elem){	
							await ctx.replyWithHTML(`<b>Тест #${elem.id}</b> - <i>${elem.login}</i>`);
						});
					 
				} catch (e){console.log('StartStep тест', e)}
				return ctx.wizard.next();
})

const oneStep = new Composer();
oneStep.on("text", async (ctx)=>{

	var ten = Number(await ctx.message.text)
	if(typeof(ten)=='number'){console.log('control number', ten)}else{console.log('control string', ten)}
	if(ten<=ctx.wizard.state.testGoScene.counter&&ten>=1){
		try{
						const test = await Test.findOne({ where: { id: ten } })
						ctx.wizard.state.testGoScene.question = test.them
						await ctx.replyWithSticker(process.env.LOGOSTICK3)
						await ctx.replyWithHTML(`<i>Тест #${test.id} - ${test.login}</i>\n\n${test.quest}\n\n<b>${test.conwa}</b>\n\n<i>Варианты ответа</i>\nПервый ответ - <b>${test.unswer1}</b>\nВторой ответ - <b>${test.unswer2}</b>\nТретий ответ - <b>${test.unswer3}</b>\nЧетвертый ответ - <b>${test.unswer4}</b>`, 
 						Markup.inlineKeyboard([
 										[Markup.button.callback('ВЫБИРАЮ ПЕРВЫЙ ОТВЕТ','test_1')],
 										[Markup.button.callback('ВЫБИРАЮ ВТОРОЙ ОТВЕТ','test_2')],
 										[Markup.button.callback('ВЫБИРАЮ ТРЕТИЙ ОТВЕТ','test_3')],
 										[Markup.button.callback('ВЫБИРАЮ ЧЕТВЕРТЫЙ ОТВЕТ','test_4')],
 									]));}catch(e){console.log('oneStep true', e)}
 						return ctx.wizard.next();
	}else{
		try{
		await ctx.replyWithHTML(`Наберите номер теста от 1 до ${ctx.wizard.state.testGoScene.counter}`)
	}catch(e){console.log('oneStep false', e)}
		return ctx.wizard.cursor;
	}
	 			 
				 
})

const endStep = new Composer();
endStep.action("test_1", async (ctx)=>{
	if(ctx.wizard.state.testGoScene.question==1){
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.OKSTICK)
		await ctx.replyWithHTML(`Вы выбрали 1 ответ. Правельно. Поздравляю`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_1 true', e)}
		return ctx.scene.leave();
		
	}else{
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.NOSTICK)
		await ctx.replyWithHTML(`Вы выбрали не верный ответ. Очень жаль но правельный ответ был #${ctx.wizard.state.testGoScene.question}`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_1 false', e)}
		return ctx.scene.leave();
	
	}
})



endStep.action("test_2", async (ctx)=>{
	if(ctx.wizard.state.testGoScene.question==2){
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.OKSTICK)
		await ctx.replyWithHTML(`Вы выбрали 2 ответ. Правельно. Поздравляю`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_2 true', e)}
		return ctx.scene.leave();
	
	}else{
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.NOSTICK)
		await ctx.replyWithHTML(`Вы выбрали не верный ответ. Очень жаль но правельный ответ был #${ctx.wizard.state.testGoScene.question}`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_2 false', e)}
		return ctx.scene.leave();
	
	}
})
endStep.action("test_3", async (ctx)=>{
	if(ctx.wizard.state.testGoScene.question==3){
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.OKSTICK)
		await ctx.replyWithHTML(`Вы выбрали 3 ответ. Правельно. Поздравляю`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_3 true', e)}
		return ctx.scene.leave();
	
	}else{
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.NOSTICK)
		await ctx.replyWithHTML(`Вы выбрали не верный ответ. Очень жаль но правельный ответ был #${ctx.wizard.state.testGoScene.question}`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_3 false', e)}
		return ctx.scene.leave();
	
	}
})
endStep.action("test_4", async (ctx)=>{
	if(ctx.wizard.state.testGoScene.question==4){
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.OKSTICK)
		await ctx.replyWithHTML(`Вы выбрали 4 ответ. Правельно. Поздравляю`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_4 true', e)}
		return ctx.scene.leave();
	
	}else{
		try{
		await ctx.answerCbQuery()
		await ctx.replyWithSticker(process.env.NOSTICK)
		await ctx.replyWithHTML(`Вы выбрали не верный ответ. Очень жаль но правельный ответ был #${ctx.wizard.state.testGoScene.question}`,
		Markup.keyboard([['СМОТРИМ СЛОВАРЬ', 'СЛУШАЕМ РАДИООБМЕН'],['РЕШАЕМ ТЕСТЫ'] ]).oneTime().resize())
	}catch(e){console.log('test_4 false', e)}
		return ctx.scene.leave();
	
	}
})




const testGoScene = new Scenes.WizardScene('goTest', startStep, oneStep, endStep);
module.exports = testGoScene