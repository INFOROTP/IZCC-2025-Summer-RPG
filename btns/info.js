const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'info',
    async execute(interaction) {
        let teams = {
            "0 小": ["871616467186098187", "715212858916339792"],
        }
        let userteam;
        for (const team in teams) {
            if (teams[team].includes(interaction.user.id)) {
                userteam = team;
                break;
            }
        }
        if (!userteam) {
            await interaction.reply({
                content: '❌｜您不在任何隊伍中',
                ephemeral: true
            });
            return;
        }

        let reply = new EmbedBuilder()
            .setTitle(userteam + ' 小隊狀態')
            .setDescription('🧩 | 線索獲得比例 0 %')
            .setColor('Blue')

        await interaction.reply({
            embeds: [reply],
            flags: 1 << 6 
        })
    }
};