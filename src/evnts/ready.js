const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const json = require(path.resolve(__dirname, '../data.json'));

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const cmdsPath = path.join(__dirname, '../cmds');
        const cmdfiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.js'));
        const devCmds = [];
        const globalCmds = [];
        for (const file of cmdfiles) {
            const cmd = require(path.join(cmdsPath, file));
            if (cmd.data && cmd.data.name) {
                if (cmd.dev) {
                    devCmds.push(cmd.data.toJSON());
                } else {
                    globalCmds.push(cmd.data.toJSON());
                }
            }
        }

        try {
            if (json.play == true) {
                await client.rest.put(`/applications/${process.env.ID}/commands`, { body: globalCmds });
                await client.rest.put(`/applications/${process.env.ID}/guilds/${json.DEV_GUILD_ID}/commands`, { body: devCmds });
            } else {
                await client.rest.put(`/applications/${process.env.ID}/commands`, { body: [] });
                await client.rest.put(`/applications/${process.env.ID}/guilds/${json.DEV_GUILD_ID}/commands`, { body: [...globalCmds, ...devCmds] });
            }
        } catch (err) {
            if (err) console.error(err);
            process.exit(1);
        }
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