const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
    name: 'reply',
    async execute(interaction) {
        let words = [];
        const timestamp = Date.now()
        await Promise.all([
            interaction.showModal(new ModalBuilder().setTitle('開啟收到的線索提示').setCustomId(`${timestamp}`).addComponents(
                new ActionRowBuilder().addComponents(
                    new TextInputBuilder().setCustomId('content').setLabel('線索開啟提示詞').setPlaceholder('NPC 提供的線索詞語').setStyle(TextInputStyle.Paragraph),
                )
            ))
        ]);
        const modal = await interaction.awaitModalSubmit({ time: 300_000, filter: (modal) => modal.customId == `${timestamp}` }).catch(() => {})
        if (!modal) return;
        if (!words.includes(modal.fields.getTextInputValue('content'))) {
            await modal.reply({
                content: '❌｜輸入的線索開啟提示詞不存在',
                ephemeral: true
            })
        }
    }
};