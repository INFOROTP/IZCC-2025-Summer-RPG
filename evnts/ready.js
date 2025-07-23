const ID = process.env.ID;
const chalk = require('chalk');
//const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    name: 'ready',
    once: true,
    async execute(client, cmds) {
        try {
            await client.rest.put(`/applications/${ID}/commands`, { body: cmds });
        } catch (err) {
            if (err) console.error(err);
              process.exit(1);
        };
        client.user.setPresence({ activities: [{ name: 'IZCC RPG' }]});
        console.log(chalk.blueBright(`啟動訊息 `) + chalk.whiteBright(`機器人 ${client.user.tag} 成功上線`));
        console.log(chalk.white('----------------------------------------------------------------'));
/*
        const confirm = new ButtonBuilder()
			.setCustomId('restart')
			.setLabel('重啟機器人')
			.setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder()
			.addComponents(confirm);
        
        const channel = await client.channels.fetch("1396824963868131379");
        const message = await channel.messages.fetch("1396826954946052178");

        message.edit({embeds: message.embeds, components: [row]})
        */
   },
};