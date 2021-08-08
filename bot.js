require('dotenv').config()
const {Telegraf} = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}! Помощь /help`))
bot.help((ctx) => ctx.reply('Чем могу помочь?\n флудилка - /chat\n Информация о ПЦР, прививках, методы тестирования - /synopsis\n вопросы и хештеги - /hashtag\n Хочешь стикеры? Приведи друга! Реферальная программа - /sticker\n Бонусы для студентов, плюшки, хостелы - /bonus\n Флаеры на скидку 20% в Инвитро - /flyer\n Даты бассейнов, адрес доставки документов, время работы - /docs'))
bot.hears('Привет', (ctx) => ctx.reply(`Привет ${ctx.message.from.first_name}! Помощь /help`))
bot.command('chat', (ctx) => ctx.reply('Общая флудилка https://t.me/c/1246298368/631 \n Август https://t.me/c/1246298368/4802 \n Сентябрь:https://t.me/c/1246298368/4808 '))
bot.command('synopsis', (ctx) => ctx.reply('https://t.me/c/1246298368/2496'))
bot.command('hashtag', (ctx) => ctx.reply('https://t.me/c/1246298368/1904'))
bot.command('sticker', (ctx) => ctx.reply('https://t.me/c/1246298368/3906 \n https://t.me/c/1246298368/3907'))
bot.command('bonus', (ctx) => ctx.reply(' https://t.me/c/1246298368/3294'))
bot.command('flyer', (ctx) => ctx.reply(' https://t.me/c/1246298368/3489'))
bot.command('docs', (ctx) => ctx.reply(' https://t.me/c/1246298368/102 \n https://t.me/c/1246298368/5218 (документы несем сюда!)'))
bot.launch()