require('dotenv').config();
const { Telegraf } = require('telegraf');
var request = require('superagent');
const TIMEOUT = 300000;
const HELLO_LIST = require('./hello')
const MODERATOR_IDS = require('./moderators')

const bot = new Telegraf(process.env.BOT_TOKEN);

// триггеры:
// Когда пишут "Привет"
bot.hears(HELLO_LIST, (ctx) => {
    try {
    if (ctx.message.from !== 1913210661) {
        const text = `<b>Привет ${ctx?.message?.from?.first_name}!</b>\nДобро пожаловать в Новосибирский чат Школы 21.\n`
        + 'Большую часть полезной инфы по бассейну ты можешь получить тут -> <a href="https://telegram.me/AlyoshkaSchool21bot?start=21">[ЗАПУСТИТЬ]</a>\n'
        + 'Если что-то будет не понятно, задавай вопрос c хештегом #естьвопросик';
        bot.telegram.sendMessage(ctx.chat.id, text, { parse_mode: 'HTML' }).then(msg => {
            setTimeout(() => { bot.telegram.deleteMessage(msg.chat.id, msg.message_id) }, TIMEOUT);
        });
    }
} catch {
    console.log('Ошибка')
    ctx.reply('Ошибка!!! Попробуй воспользоваться командой /start')
}
});

// Когда кто-то присоединяется к каналу
bot.on('new_chat_members', (ctx) => {
    if (ctx.chat.id === -1001246298368) {
        const text = `<b>Привет ${ctx?.message?.new_chat_members?.length ? ctx?.message?.new_chat_members[0]?.first_name : ''}!</b>\nДобро пожаловать в Новосибирский чат Школы 21.\n`
        + 'Большую часть полезной инфы по бассейну ты можешь получить тут -> <a href="https://telegram.me/AlyoshkaSchool21bot?start=21">[ЗАПУСТИТЬ]</a>\n'
        + 'Если что-то будет не понятно, задавай вопрос c хештегом #естьвопросик';
        bot.telegram.sendMessage(ctx.chat.id, text, { parse_mode: 'HTML' }).then(msg => {
            setTimeout(() => { bot.telegram.deleteMessage(msg.chat.id, msg.message_id) }, TIMEOUT);
        });
    }
});

// команды бота (доступны только через личные сообщения):
bot.start((ctx) => {
    if (ctx.chat.type === 'private') {
        bot.telegram.setMyCommands([
            { command: 'start', description: 'Запустить бота' },
            { command: 'chat', description: 'Инфа о чатах' },
            { command: 'synopsis', description: 'ПЦР, прививки' },
            { command: 'hashtag', description: 'Часто задаваемые вопросы' },
            { command: 'sticker', description: 'Рефералка на стикеры' },
            { command: 'hashtag', description: 'Часто задаваемые вопросы' },
            { command: 'flyer', description: 'Флаеры на скидку инвитро' },
            { command: 'hashtag', description: 'Часто задаваемые вопросы' },
            { command: 'docs', description: 'Инфа по документам' },
            { command: 'docs', description: 'Инфа по документам' },
            { command: 'motivation', description: 'Послание от июльских' },
            { command: 'msg', description: 'Сообщение в "Подслушано 21_nsk"' }
        ]);
        ctx.reply(`Привет ${ctx.message.from.first_name}! Чем могу помочь?\n`
        + `Чат для абитуриентов - /chat\n`
        + `Информация о ПЦР, прививках, методы тестирования - /synopsis\n`
        + `вопросы и хештеги - /hashtag\n`
        + `Хочешь стикеры? Приведи друга! Реферальная программа - /sticker\n`
        + `Бонусы для студентов, плюшки, хостелы - /bonus\n`
        + `Флаеры на скидку 20% в Инвитро - /flyer\n`
        + `Даты бассейнов, адрес доставки документов, время работы - /docs\n`
        + `Послание от участников первого интенсива - /motivation`);
    }
});
bot.command('chat', (ctx) => {
    if (ctx.chat.type === 'private') {
        const text = 'Если ты хочешь пообщаться со всеми учениками -> <a href="https://t.me/joinchat/dDOu58YTbusyMGUy">[Общая флудилка]</a>  \n' 
                   + 'Если ты на август жми -> <a href="https://t.me/joinchat/PVhM_wCXBvg1OTUy">[Август]</a> \n' 
                   + 'Если ты на сентябрь тебе сюда -> <a href="https://t.me/joinchat/okNp5NgeQeY4MmMy">[Сентябрь]</a> \n'
                   + 'Если тебе нужна помощь в поиске жилья <b>на время интенсива</b> то жми сюда-> <a href="https://t.me/joinchat/jVxInVJidTgzNTEy">[Жильё]</a>'
                  bot.telegram.sendMessage(ctx.chat.id, text, { parse_mode: 'HTML' }, {disable_wed_page_preview: true})
    }
});
bot.command('synopsis', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/2496');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 2496, {disable_notification: true});
    }
});
bot.command('hashtag', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/1904');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 1904, {disable_notification: true});
    }
});
bot.command('sticker', (ctx) => {
    if (ctx.chat.type === 'private') {
        //ctx.reply('https://t.me/c/1246298368/3906 \n https://t.me/c/1246298368/3907');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 3906, {disable_notification: true});
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 3907, {disable_notification: true});
    }
});
bot.command('bonus', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/3294');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 3294, {disable_notification: true});
    }
});
bot.command('flyer', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/3489');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 3489, {disable_notification: true});
    }
});
bot.command('docs', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/102 \n https://t.me/c/1246298368/5218 (документы несем сюда!)');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 102, {disable_notification: true});
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 5218, {disable_notification: true});
    }
});
bot.command('motivation', (ctx) => {
    if (ctx.chat.type === 'private') {
        // ctx.reply('https://t.me/c/1246298368/5928');
        bot.telegram.forwardMessage(ctx.update.message.chat.id, -1001246298368, 5928, {disable_notification: true});
    }
});
bot.command('checkme', (ctx) => {
    if (ctx.chat.type === 'private') {
        const result = Math.round((Math.random() * 100) * (Math.random() * 4) * 0.25);
        const text = `<b>(Verter) Ваш результат: </b> ${ result >= 26 ? "Completed" : "Fail"} (${ 1.5 * result } XP, ${result}%)`;
        bot.telegram.sendMessage(ctx.chat.id, text, { parse_mode: 'HTML' });
    }
});
bot.command('del', (ctx) => {
    if (ctx.chat.type === 'private' && MODERATOR_IDS.includes(ctx.message.from.id)) {
        delete_id = +(ctx.message.text.substring(5) || "0");
        if (delete_id) {
            bot.telegram.deleteMessage(-1001246298368, delete_id).then(action => {
                ctx.reply(`Сообщение [ID:${delete_id}] удалено.`);
            }).catch(err => {
                ctx.reply(`Не получилось удалить сообщение [ID:${delete_id}].`);
            })
        } else {
            ctx.reply(`Вы не указали ID сообщения для удаления.`);
        }
    }
});
bot.command('msg', (ctx) => {
    if (ctx.chat.type === 'private') {
        msg = ctx.message.text.substring(5) || "";
        if (msg) {
            request
                .post(`https://docs.google.com/forms/d/e/1FAIpQLSeink4UdIlkNSy-BwH_6hYEIub4ENDiZXcalWCaRil3SLOLuw/formResponse`).type('form').send({'entry.752692254': msg})
                .end((err, res) => {
                    if (err || !res.ok) {
                        ctx.reply(`Не удалось отправить сообщение: ${msg}`);
                    } else {
                        ctx.reply(`Ваше сообщение успешно отправлено.`);
                    }
                });
        } else {
            ctx.reply(`Вы не написали сообщение.`);
        }
    }
});
bot.on('text', (ctx) => {
    if (ctx.message.from !== 1913210661
        && ctx.chat.type === 'private'
        && !HELLO_LIST.includes(ctx.message.text)) {
        ctx.reply(`Не очень понимаю о чём ты! Нажмите команду /start и возможно я смогу вам помочь`);
    }
});
bot.launch();