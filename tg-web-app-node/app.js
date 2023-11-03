require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TELEGRAM_BOT_TOKEN
const webAppUrl = process.env.WEB_APP_URL

const bot = new TelegramBot(token, {polling: true})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    const text = msg.text

    if(text === '/start') {
        try {
            await bot.sendMessage(chatId, 'Welcome to AWEX B2B Bot', {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'web app', web_app: {url: webAppUrl}}]
                    ]
                }
            })

            await bot.sendMessage(chatId, 'Welcome to AWEX B2B Bot', {
                reply_markup: {
                    keyboard: [
                        [{text: 'web app', web_app: {url: webAppUrl}}]
                    ]
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    console.log({text})
})
