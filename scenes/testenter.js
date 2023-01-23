const {Markup, Composer, Scenes} = require('telegraf')
const Test = require('../models/testModel')

const startStep = new Composer()
startStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
			 
			ctx.wizard.state.testEnterScene = {}
			await ctx.replyWithPhoto(process.env.TEST1,{caption:`Наберите название теста. (тема)`},)
		} catch (e){console.log('startStep тест', e)}
			return ctx.wizard.next()
	 
})

const oneStep = new Composer()
oneStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
			ctx.wizard.state.testEnterScene.login = ctx.message.text
			await ctx.replyWithHTML(`Получено название теста \n <b>${ctx.message.text}</b>\n\n Теперь наберите вопрос теста.`)
		} catch (e){console.log('oneStep тест', e)}
			return ctx.wizard.next()
	 
})

const twoStep = new Composer()
twoStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
			ctx.wizard.state.testEnterScene.quest = ctx.message.text
			await ctx.replyWithHTML(`Получен вопрос теста \n <b>${ctx.message.text}</b>\n\n Теперь наберите конву теста.`)
		} catch (e){console.log('twoStep тест', e)}
			return ctx.wizard.next()
	 
})

const threeStep = new Composer();
threeStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
			ctx.wizard.state.testEnterScene.conwa = ctx.message.text
			await ctx.replyWithHTML(`Получена конва теста \n <b>${ctx.message.text}</b>\n\n Теперь наберите варианты ответов через слэш.`)
		} catch (e){console.log('threeStep тест', e)}
			return ctx.wizard.next()
	 
})

const fourStep = new Composer();
fourStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
		  const rex = ctx.message.text.split("/")
			ctx.wizard.state.testEnterScene.unswer1 = rex[0]
			ctx.wizard.state.testEnterScene.unswer2 = rex[1]
			ctx.wizard.state.testEnterScene.unswer3 = rex[2]
			ctx.wizard.state.testEnterScene.unswer4 = rex[3]
			await ctx.replyWithHTML(`Получены варианты ответов теста.\n 1. <b>${rex[0]}</b>\n 2. <b>${rex[1]}</b>\n 3. <b>${rex[2]}</b>\n 4. <b>${rex[3]}</b>\n\n
			Теперь наберите цифрой правельный ответ.`)
		} catch (e){console.log('fourStep тест', e)}
			return ctx.wizard.next()
	 
})
const fiveStep = new Composer();
fiveStep.on("text", async (ctx)=>{
	try {ctx.deleteMessage()
			ctx.wizard.state.testEnterScene.them = ctx.message.text
			await ctx.replyWithHTML(`Ура. Тест собран:\n<i>Тема теста</i> - <b>${ctx.wizard.state.testEnterScene.login}</b>\n<i>Вопрос теста</i> - <b>${ctx.wizard.state.testEnterScene.quest}</b>
			\n <i>конва</i> - <b>${ctx.wizard.state.testEnterScene.conwa}</b>
			\n <i>1 вариант ответа</i> - <b>${ctx.wizard.state.testEnterScene.unswer1}</b>
			\n <i>2 вариант ответа</i> - <b>${ctx.wizard.state.testEnterScene.unswer2}</b>
			\n <i>3 вариант ответа</i> - <b>${ctx.wizard.state.testEnterScene.unswer3}</b>
			\n <i>4 вариант ответа</i> - <b>${ctx.wizard.state.testEnterScene.unswer4}</b>
			\n Из предложенных вариантов - правельный - <b>${ctx.wizard.state.testEnterScene.them}</b>
			Теперь если все правельно - нажмите <b>(ЗАПИСАТЬ)</b>.\n Если нет - нажмите <b>(ОТКЛОНИТЬ)</b>.`, 
			Markup.inlineKeyboard([
				[Markup.button.callback('ЗАПИСАТЬ','tm7'),Markup.button.callback('ОТКЛОНИТЬ','tm6')]
			]))
		} catch (e){console.log('fiveStep тест', e)}
			return ctx.wizard.next()
	 
})
const endStep = new Composer();
endStep.action("tm7", async (ctx)=>{
	try {
				const testdata = Test.build({
			 	login:ctx.wizard.state.testEnterScene.login,
			 	quest:ctx.wizard.state.testEnterScene.quest,
			 	conwa:ctx.wizard.state.testEnterScene.conwa,
			 	unswer1:ctx.wizard.state.testEnterScene.unswer1,
			 	unswer2:ctx.wizard.state.testEnterScene.unswer2,
			 	unswer3:ctx.wizard.state.testEnterScene.unswer3,
			 	unswer4:ctx.wizard.state.testEnterScene.unswer4,
			 	them:ctx.wizard.state.testEnterScene.them
			 })
			 testdata.save().then(res=>{
			ctx.answerCbQuery()
			ctx.replyWithHTML(`Все прошло успешно.\n Тест сохранен\n\n<i>Большое спасибо \n Вы сделали хорошую работу.</i>`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize())
			})
		} catch (e){console.log('EndStep тест', e)}
		return ctx.scene.leave()
		 
});

endStep.action("tm6", async (ctx)=>{
	try {
			await ctx.answerCbQuery()
			await ctx.replyWithHTML(`Ничего страшного.\nВы всегда можете начать все сначала`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize())
		} catch (e){console.log('EndStep тест', e)}
		return ctx.scene.leave()
		 
})




const testEnterScene = new Scenes.WizardScene('enterTest', startStep,oneStep,twoStep,threeStep,fourStep,fiveStep,endStep)
module.exports = testEnterScene