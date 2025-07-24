const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'rept',
    async execute(interaction) {
        const match = interaction.customId.match(/^rept([0-4])$/);
        if (!match) {
            await interaction.reply({ content: '❌｜未知的小隊', ephemeral: true });
            return;
        }
        const teamIdx = match[1];
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`rept${teamIdx}_start`)
                .setLabel('開始')
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`rept${teamIdx}_leave`)
                .setLabel('離開')
                .setStyle(ButtonStyle.Danger)
        );
        await interaction.reply({
            content: `📢｜正在回報「${teamIdx} 小」小隊的位置，請選擇：`,
            components: [row],
            flags: 1 << 6 
        });
    }
};
