const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TEAM_NAME = '3 小';

module.exports = {
    name: 'rept3',
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('rept3_start')
                .setLabel('開始')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('rept3_leave')
                .setLabel('離開')
                .setStyle(ButtonStyle.Danger)
        );
        await interaction.reply({
            content: `📢｜正在回報「${TEAM_NAME}」小隊的位置，請選擇：`,
            components: [row],
            flags: 1 << 6 
        });
    }
};
