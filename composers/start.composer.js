const { Markup, Composer } = require('telegraf')
const composer = new Composer()
require('dotenv').config()
const User = require('../models/userModel')

composer.start(async (ctx) =>{
	const user = User.build({ 
		uuid: ctx.chat.id,
		firstName: ctx.chat.first_name,
		lastName: ctx.chat.last_name, 
		user_name: ctx.chat.username,
		test_ind:'111'})

	const expo = ctx.chat.id;
	const admin = Number(process.env.ADMIN)
	const admin2 = Number(process.env.ADMIN2)
	switch (expo) {
		case admin:
			try{
					 const tex = `<b>Привет</b> <i>${ctx.message.chat.first_name} ${ctx.message.chat.last_name}.</i>\n<b>Жду Ваших команд.</b>`
					 await ctx.replyWithPhoto(process.env.LOGO1, {caption: tex, parse_mode:'HTML'} )
					 await ctx.replyWithHTML(`<i>ADMIN LONG TIME.</i>`,
											Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']]).oneTime())
				 } catch (e){console.log('parse_parse',e)}
			break;
			case admin2:
			try{
					 const tex = `<b>Привет</b> <i>${ctx.message.chat.first_name} ${ctx.message.chat.last_name}.</i>\n<b>Жду Ваших команд.</b>`
					 await ctx.replyWithPhoto(process.env.LOGO1, {caption: tex, parse_mode:'HTML'} )
					 await ctx.replyWithHTML(`<i>Hi Irina Igorevna.</i>`,
											Markup.keyboard([['ЗАПОЛНЯЕМ СЛОВАРЬ', 'СОЗДАЕМ ФРАЗУ'],['ЗАПОЛНЯЕМ ТЕСТ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ']]).oneTime())
				 } catch (e){console.log('parse_parse',e)}
			break;
			default:
						User.findOne({ where: { uuid: ctx.chat.id } }).then(res=>{
							if (res === null){
								 		try{user.save();
								 			  const text = `Welcome ${ctx.chat.last_name}. Nice to meet you.\n Aviaton phrase traning bot2.`
								 				ctx.replyWithPhoto(process.env.LOGO1, {caption: text,parse_mode:'HTML'})
								 				ctx.replyWithHTML(`<i>Roomyantseva Irina Igorevna from ASHI teacher.</i>`,
								 				Markup.keyboard([['АНГЛИЙСКИЙ', 'БИОЛОГИЯ'],['ХИМИЯ','АВИАСИМ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime())
								 				} catch (e){console.log('USER saved', e)}
									}else{
										try{ 
											const text = `<b>Выбирайте нужный раздел.</b>`
											ctx.replyWithPhoto(process.env.LOGO1, {caption: text,parse_mode:'HTML'})
											ctx.replyWithHTML(`<i>Главное меню</i>`,
											Markup.keyboard([['АНГЛИЙСКИЙ', 'БИОЛОГИЯ'],['ХИМИЯ','АВИАСИМ'],['ВЕРНУТЬСЯ НА ГЛАВНУЮ'] ]).oneTime())
										} catch (e){console.log('USER  will be saved',e)}
									}

						})



	}


})

module.exports = composer