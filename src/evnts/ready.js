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
        /*client.channels.fetch("1396542455641538622")
            .then(channel => {
                channel.send({
                    content: ``,
                    embeds: [
                        {
                            title: 'NPC 小隊狀態回報',
                            description: "小隊到你的關卡開始問問題/玩遊戲的時候，以及小隊離開時，點下面的按鈕進行回報。",
                            footer: {
                                text: 'RPG 小精靈',
                                icon_url: client.user.displayAvatarURL()
                            }
                        }
                    ],
                    components: [{
                        type: 1,
                        components: [
                            {
                                type: 2,
                                label: '零小',
                                style: 2,
                                custom_id: 'rept0'
                            },
                            {
                                type: 2,
                                label: '一小',
                                style: 2,
                                custom_id: 'rept1'
                            },
                            {
                                type: 2,
                                label: '二小',
                                style: 2,
                                custom_id: 'rept2'
                            },
                            {
                                type: 2,
                                label: '三小',
                                style: 2,
                                custom_id: 'rept3'
                            },
                            {
                                type: 2,
                                label: '四小',
                                style: 2,
                                custom_id: 'rept4'
                            }
                        ]
                    }]
                });
            });*/
    },
};