const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()

composer.hears('ВЕРНУТЬСЯ НА ГЛАВНУЮ', async (ctx)=>{
	const text = `<b>Выбирайте нужный раздел.</b>`
	try{
		await ctx.deleteMessage()
		await ctx.replyWithPhoto(process.env.LOGO1, {caption: text,parse_mode:'HTML'})
		await ctx.replyWithHTML(`<i>Главное меню</i>`,
		Markup.keyboard([['АНГЛИЙСКИЙ', 'БИОЛОГИЯ'],['ХИМИЯ','АВИАСИМ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime())
	
			}catch(e){console.log('Главное меню', e);}
		
		
})

module.exports = composer