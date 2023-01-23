const {Markup, Composer, Scenes} = require('telegraf');
require('dotenv').config();
const Word = require('../models/wordModel');

const startStep = new Composer();
startStep.on("text", async (ctx)=>{
	//console.log(ctx.message.message_id)
	
	ctx.wizard.state.wordEnterScene = {}
	//ctx.wizard.state.wordEnterScene.message_id = ctx.message.message_id
	try {
		await ctx.replyWithPhoto(process.env.WORD3,{caption:`Наберите словарное слово \n на английском языке.\n
	\n( например  BEETLS )`},);
			return ctx.wizard.next();
	} catch (e){console.log('StartStep словарь', e)}
})

const twoStep = new Composer();
twoStep.on("text", async (ctx)=>{
	try {
		ctx.wizard.state.wordEnterScene.ingtext = ctx.message.text
		 
			await ctx.replyWithHTML(`Вы набрали слово <b>${ctx.message.text}</b>\n <i>Теперь наберите перевод слова \n на русском языке.\n\n( например  ЖУКИ )</i>`);
			return ctx.wizard.next();
	} catch (e){console.log('TwoStep словарь', e)}
})

const threeStep = new Composer();
threeStep.on("text", async (ctx)=>{
	try {
			ctx.wizard.state.wordEnterScene.rutext = ctx.message.text
			ctx.replyWithHTML(`Вы набрали слово  <b>( ${ctx.wizard.state.wordEnterScene.ingtext}) </b>\n и обозначили его перевод <b>( ${ctx.wizard.state.wordEnterScene.rutext} )</b>\n <i>Cохраните словарное слово \n Или отклоните.</i>`,
			Markup.inlineKeyboard([
				[Markup.button.callback('ЗАПИСАТЬ','wd7'),Markup.button.callback('ОТКЛОНИТЬ','wd6')]
			]));
			 
			return ctx.wizard.next();
	} catch (e){console.log('ThreeStep словарь', e)}
})

const endStep = new Composer();
endStep.action("wd7", async (ctx)=>{
	try {
			const worddata = Word.build({
									login:ctx.callbackQuery.from.id,
						      ingtext: ctx.wizard.state.wordEnterScene.ingtext,
						      rutext:	ctx.wizard.state.wordEnterScene.rutext,
									})
			worddata.save().then(res=>{
			ctx.deleteMessage()
			ctx.answerCbQuery();
			ctx.replyWithHTML(`Все прошло успешно. Словарное слово <b>${res.ingtext}</b>\nуспешно сохранено\nи установлен перевод <b>${res.rutext}</b>\n\n 
			<i>Большое спасибо \n Вы сделали хорошую работу.</i>`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize());
			})
		return ctx.scene.leave();
		} catch (e){console.log('EndStep словарь', e)}
})

endStep.action("wd6", async (ctx)=>{
	try {
			ctx.deleteMessage()
			ctx.answerCbQuery();
			ctx.replyWithHTML(`Ничего страшного.\nВы всегда можете начать все сначала`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize());
			
		return ctx.scene.leave();
		} catch (e){console.log('EndStep словарь', e)}
})


const wordEnterScene = new Scenes.WizardScene('enterWord', startStep, twoStep, threeStep, endStep);
module.exports = wordEnterScene