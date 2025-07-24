const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
require('dotenv').config();

const TOKEN = process.env.TOKEN;
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.events = new Collection();
const eventsPath = path.join(__dirname, 'evnts');
fs.readdirSync(eventsPath).forEach(file => {
    if (!file.endsWith('.js')) return;
    const event = require(path.join(eventsPath, file));
    client.events.set(event.name, event);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
    console.log(chalk.yellowBright(`事件創建 `) + chalk.white(`${event.name} 事件監聽器創建成功`));
});

client.commands = new Collection();
const cmdsPath = path.join(__dirname, 'cmds');
fs.readdirSync(cmdsPath).forEach(file => {
    if (!file.endsWith('.js')) return;
    const cmd = require(path.join(cmdsPath, file));
    if (cmd.data && cmd.data.name) {
        client.commands.set(cmd.data.name, cmd);
        console.log(chalk.green(`指令設置 `) + chalk.white(`${cmd.data.name} 指令設置成功`));
    }
});

client.buttons = new Collection();
const btnsPath = path.join(__dirname, 'btns');
fs.readdirSync(btnsPath).forEach(file => {
    if (!file.endsWith('.js') || /^rept[0-4]\.js$/.test(file)) return;
    const btn = require(path.join(btnsPath, file));
    if (btn.name === 'rept') {
        for (let i = 0; i < 5; i++) {
            client.buttons.set(`rept${i}`, btn);
        }
    } else {
        client.buttons.set(btn.name, btn);
    }
    console.log(chalk.redBright(`按鈕設置 `) + chalk.white(`${btn.name} 指令設置成功`));
});

client.login(TOKEN);