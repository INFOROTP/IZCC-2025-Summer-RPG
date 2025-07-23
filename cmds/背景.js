const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const json = require('../data.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('背景')
        .setDescription('檢視遊戲背景故事'),
    async execute(interaction) {
        await interaction.deferReply();
        const bga = new EmbedBuilder()
            .setAuthor({
                iconURL: "https://media.discordapp.net/attachments/1397262869543784540/1397262937990631554/37_20250707003235.png?ex=68811604&is=687fc484&hm=25f89cb4bfadaa09cd81f699bd6b55f456107598076f460cf4900c74b1facef3&=&format=webp&quality=lossless&width=930&height=930",
                name: "2025 IZCC 夏夜晚楓建景成 RPG",
            })
            .setTitle('故事背景')
            .setDescription(json.story['start-0'])
        const bgb = new EmbedBuilder()
            .setTitle('IZCC 即時新聞報導')
            .setImage('https://media.discordapp.net/attachments/1366743015867027498/1397261581364101170/image.png?ex=688114c0&is=687fc340&hm=d9e621d1a65b61726c15a7a72fcd354af0168d38f4c6b8837baba590e0714588&=&format=webp&quality=lossless&width=1156&height=724')
        const bgc = new EmbedBuilder()
            .setDescription(json.story['start-1'])
            .setFooter({ text: '加油，努力尋找線索，解開謎團！', iconURL: interaction.client.user.displayAvatarURL() })
        const btn = new ButtonBuilder()
			.setCustomId('map')
			.setLabel('🗺️ 臺大地圖')
			.setStyle(ButtonStyle.Success);
        const reply = new ButtonBuilder()
            .setCustomId('reply')
            .setLabel('⏪ 開啟新線索')
            .setStyle(ButtonStyle.Primary);
        const info = new ButtonBuilder()
            .setCustomId('info')
            .setLabel('🆔 小隊狀態')
            .setStyle(ButtonStyle.Danger);
        const data = new ButtonBuilder()
            .setCustomId('data')
            .setLabel('📃 初始資料')
            .setStyle(ButtonStyle.Primary);
        
        await interaction.editReply({
            embeds: [bga, bgb, bgc],
            components: [{
                type: 1,
                components: [data, btn, reply, info]
            }]
        });
    }
};
