const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const TEAM_NAME = '1 小';

module.exports = {
    name: 'rept1',
    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('rept1_start')
                .setLabel('開始')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('rept1_leave')
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
