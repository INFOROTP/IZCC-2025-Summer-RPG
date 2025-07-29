const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');
const path = require('path');
const json = require(path.resolve(__dirname, '../../data.json'));

module.exports = {
    name: 'reply',
    async execute(interaction) {
        const timestamp = Date.now();
        await interaction.showModal(
            new ModalBuilder()
                .setTitle('開啟收到的線索提示')
                .setCustomId(`${timestamp}`)
                .addComponents(
                    new ActionRowBuilder().addComponents(
                        new TextInputBuilder()
                            .setCustomId('content')
                            .setLabel('線索開啟提示詞')
                            .setPlaceholder('NPC 提供的線索詞語')
                            .setStyle(TextInputStyle.Paragraph)
                    )
                )
        );
        const modal = await interaction.awaitModalSubmit({
            time: 300_000,
            filter: (modal) => modal.customId == `${timestamp}`
        }).catch(() => {});
        if (!modal) return;

        const keyword = modal.fields.getTextInputValue('content').trim();
        const clues = json.clues || {};
        const clue = clues[keyword];
        if (clue) {
            const embed = new EmbedBuilder().setTitle(`🔎 線索：「${keyword}」`).setColor('Green');
            if (clue.startsWith('https://')) {
                embed.setImage(clue);
            } else {
                embed.setDescription(clue);
            }
            await modal.reply({
                embeds: [embed]
            });
        } else {
            await modal.reply({
                content: '❌｜輸入的線索開啟提示詞不存在',
                ephemeral: true
            });
        }
    }
};