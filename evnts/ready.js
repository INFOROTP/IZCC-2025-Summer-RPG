const ID = process.env.ID;
const chalk = require('chalk');
// const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    name: 'ready',
    once: true,
    async execute(client, cmds) {
        try {
            //await client.rest.put(`/applications/${ID}/commands`, { body: cmds });
            await client.rest.put(`/applications/${ID}/commands`, { body: [] });
            await client.rest.put(`/applications/${ID}/guilds/1396814603677335706/commands`, { body: cmds });
        } catch (err) {
            if (err) console.error(err);
              process.exit(1);
        };
        client.user.setPresence({ activities: [{ name: 'IZCC RPG' }]});
        console.log(chalk.blueBright(`啟動訊息 `) + chalk.whiteBright(`機器人 ${client.user.tag} 成功上線`));
        console.log(chalk.white('----------------------------------------------------------------'));
   },
};