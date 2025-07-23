
const fs = require('fs');
const chalk = require('chalk');

require('dotenv').config();

const TOKEN = process.env.TOKEN;

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

// Event handler
const evntfiles = fs.readdirSync('./evnts').filter(file => file.endsWith(".js"));
for (const file of evntfiles) {
    const evnt = require(`./evnts/${file}`);
    if (evnt.once) {
        client.once(evnt.name, (...args) => evnt.execute(...args, cmds));
    } else {
        client.on(evnt.name, (...args) => {
            console.log(chalk.blueBright(`事件觸發 `) + chalk.white(`${evnt.name} 事件被觸發，將開始進行回應`))
            evnt.execute(...args, cmds)
        });
    };
    console.log(chalk.yellowBright(`事件創建 `) + chalk.white(`${evnt.name} 事件監聽器創建成功`))
};

// Command handler
const cmdfiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const cmds = [];
client.commands = new Collection();
for (const file of cmdfiles) {
    const cmd = require(`./cmds/${file}`);
    client.commands.set(cmd.data.name, cmd);
    cmds.push(cmd.data.toJSON());
    console.log(chalk.green(`指令設置 `) + chalk.white(`${cmd.data.name} 指令設置成功`))
};

// Button handler
const btnfiles = fs.readdirSync('./btns').filter(file => file.endsWith('.js'));
client.buttons = new Collection();
for (const file of btnfiles) {
    const btn = require(`./btns/${file}`);
    client.buttons.set(btn.name, btn);
    console.log(chalk.green(`按鈕設置 `) + chalk.white(`${btn.name} 指令設置成功`))
};

// Login
client.login(TOKEN);