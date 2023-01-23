const { Telegraf, Scenes, session, Context } = require('telegraf')
const wordEnterScene = require('./scenes/wordenter')
const frazeEnterScene = require('./scenes/frazeenter')
const testEnterScene = require('./scenes/testenter')
const testGoScene = require('./scenes/testgo')

require('dotenv').config()

const bot = new Telegraf(process.env.TOKEN)

const stage = new Scenes.Stage([wordEnterScene,frazeEnterScene,testEnterScene,testGoScene]);
bot.use(session());
bot.use(stage.middleware());

//bot.use(require('./composers/admin.composer'));
bot.use(require('./composers/user.composer'))
bot.use(require('./composers/inglish.composer'))
bot.use(require('./composers/sim.composer'))
bot.use(require('./composers/aero.composer'))
bot.use(require('./composers/start.composer'))
bot.use(require('./composers/default.composer'))

bot.on('message', (ctx)=>{console.log(ctx.message)})

bot.launch();


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))