const {Markup, Composer, Scenes} = require('telegraf');
const Fraze = require('../models/frazeModel');

const startStep = new Composer();
startStep.on('text', async (ctx)=>{
	try {
			ctx.wizard.state.frazeEnterScene = {}
			await ctx.replyWithPhoto(process.env.FRAZE2,{caption:`Загрузите подготовленный АУДИО файл\n на английском языке.`},{parse_mode: 'HTML'});
			return ctx.wizard.next();
	} catch (e){console.log('startStep фраза', e)}
})

const twoStep = new Composer();
twoStep.on('audio', async (ctx)=>{
	try { //console.log(ctx.message.audio.file_id)
			ctx.wizard.state.frazeEnterScene.ingfraze = ctx.message.audio.file_id
			await ctx.replyWithHTML(`<b>Audio есть.</b>\n Теперь наберите эту же фразу\n на <b>английском</b> языке.`);
			return ctx.wizard.next();
	} catch (e){console.log('twoStep фраза', e)}
})

const threeStep = new Composer();
threeStep.on("text", async (ctx)=>{
	try {
			ctx.wizard.state.frazeEnterScene.ingtext = ctx.message.text
			await ctx.replyWithHTML(`Вы набрали английский текст:\n <b>${ctx.message.text}</b>\n Теперь наберите его перевод.`);
			return ctx.wizard.next();
	} catch (e){console.log('threeStep фраза', e)}
})

const fourStep = new Composer();
fourStep.on("text", async (ctx)=>{
	try {
			ctx.wizard.state.frazeEnterScene.rutext = ctx.message.text
			await ctx.replyWithHTML(`Вы набрали русский перевод:\n <b>${ctx.message.text}</b>\n Теперь наберите название темы.`);
			return ctx.wizard.next();
	} catch (e){console.log('fourStep фраза', e)}
})

const fiveStep = new Composer();
fiveStep.on("text", async (ctx)=>{
	try {
			ctx.wizard.state.frazeEnterScene.theame = ctx.message.text
			await ctx.replyWithHTML(`Ура Тема обозначена как:\n <b>${ctx.message.text}</b>\n Теперь если все правельно - нажмите <b>(ЗАПИСАТЬ)</b>.\n Если нет - нажмите <b>(ОТКЛОНИТЬ)</b>.`, 
			Markup.inlineKeyboard([
				[Markup.button.callback('ЗАПИСАТЬ','fz7'),Markup.button.callback('ОТКЛОНИТЬ','fz6')]
			]));
			return ctx.wizard.next();
	} catch (e){console.log('fiveStep фраза', e)}
})

const endStep = new Composer();
endStep.action("fz7", async (ctx)=>{
	try {
			const frazedata = Fraze.build({
									login:ctx.callbackQuery.from.id,
									ingfraze: ctx.wizard.state.frazeEnterScene.ingfraze,
						      ingtext: ctx.wizard.state.frazeEnterScene.ingtext,
						      rutext:	ctx.wizard.state.frazeEnterScene.rutext,
									theame: ctx.wizard.state.frazeEnterScene.theame
									})
									frazedata.save().then(res=>{
			ctx.deleteMessage()
			ctx.answerCbQuery();
			ctx.replyWithHTML(`Все прошло успешно.\nФраза сохранена <b>${res.ingtext}</b>\nУстановлен перевод \n<b>${res.rutext}</b>.\n 
			Назначена тема <b>${res.theame}</b>.\n\n<i>Большое спасибо \n Вы сделали хорошую работу.</i>`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize());
			})
		return ctx.scene.leave();
		} catch (e){console.log('EndStep фраза', e)}
})

endStep.action("fz6", async (ctx)=>{
	try {
			ctx.deleteMessage()
			ctx.answerCbQuery();
			ctx.replyWithHTML(`Ничего страшного.\nВы всегда можете начать все сначала`,
			Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'] ]).oneTime().resize());
			
		return ctx.scene.leave();
		} catch (e){console.log('EndStep фраза', e)}
})



const frazeEnterScene = new Scenes.WizardScene('enterFraze', startStep, twoStep, threeStep, fourStep, fiveStep, endStep);
module.exports = frazeEnterScene