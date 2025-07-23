const fs = require('fs');
const { Collection } = require('discord.js');
const chalk = require('chalk');

const cmdfiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const cmds = [];
const devCmds = [];
const globalCmds = [];
const commandsCollection = new Collection();

for (const file of cmdfiles) {
    const cmd = require(`./cmds/${file}`);
    commandsCollection.set(cmd.data.name, cmd);
    cmds.push(cmd.data.toJSON());
    if (cmd.dev) {
        devCmds.push(cmd.data.toJSON());
    } else {
        globalCmds.push(cmd.data.toJSON());
    }
    console.log(chalk.green(`指令設置 `) + chalk.white(`${cmd.data.name} 指令設置成功`))
}

module.exports = {
    cmds,
    devCmds,
    globalCmds,
    commandsCollection
};