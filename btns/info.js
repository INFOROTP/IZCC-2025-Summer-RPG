const { EmbedBuilder } = require('discord.js');
const json = require('../data.json');

module.exports = {
    name: 'info',
    async execute(interaction) {
        await interaction.deferReply({ flags: 1 << 6  });
        let userteam;
        for (const team of json.groups) {
            if (team.members.includes(interaction.user.id)) {
                userteam = team.name;
                break;
            }
        }
        if (!userteam) {
            await interaction.editReply({
                content: '❌｜您不在任何小隊中',
                ephemeral: true
            });
            return;
        }

        let reply = new EmbedBuilder()
            .setTitle(userteam + ' 小隊狀態')
            .setDescription('🧩 | 線索獲得比例 0 %')
            .setColor('Blue')

        await interaction.editReply({
            embeds: [reply],
            flags: 1 << 6 
        })
    }
};