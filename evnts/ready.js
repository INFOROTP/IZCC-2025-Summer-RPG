const ID = process.env.ID;
const chalk = require('chalk');
const { devCmds, globalCmds } = require('../cmdLoader.js');
const devGuild = require('../data.json').DEV_GUILD_ID;
const json = require('../data.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, cmds) {
        try {
            if (json.play == true) {
                await client.rest.put(`/applications/${ID}/commands`, { body: globalCmds });
                await client.rest.put(`/applications/${ID}/guilds/${devGuild}/commands`, { body: devCmds });
            } else {
                await client.rest.put(`/applications/${ID}/commands`, { body: [] });
                await client.rest.put(`/applications/${ID}/guilds/${devGuild}/commands`, { body: [...globalCmds, ...devCmds] });
            }
            
        } catch (err) {
            if (err) console.error(err);
              process.exit(1);
        };
        client.user.setPresence({ activities: [{ name: 'IZCC RPG' }]});
        console.log(chalk.blueBright(`啟動訊息 `) + chalk.whiteBright(`機器人 ${client.user.tag} 成功上線`));
        console.log(chalk.white('----------------------------------------------------------------'));
   },
};