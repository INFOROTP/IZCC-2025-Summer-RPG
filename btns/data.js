const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'data',
    async execute(interaction) {
        await interaction.deferReply();
        const dta = new EmbedBuilder()
            .setAuthor({
                iconURL: "https://media.discordapp.net/attachments/1397262869543784540/1397262937990631554/37_20250707003235.png?ex=68811604&is=687fc484&hm=25f89cb4bfadaa09cd81f699bd6b55f456107598076f460cf4900c74b1facef3&=&format=webp&quality=lossless&width=930&height=930",
                name: "2025 IZCC 夏夜晚楓建景成 RPG",
            })
            .setTitle('初始資料')
            .setDescription("以下為案件初始資料\n1. 游汐芸所參加的藥學系聚會資訊\n2. 警方針對此案件的初步調查報告")
        const dtb = new EmbedBuilder()
            .setTitle('聚會資訊')
            .setImage('https://media.discordapp.net/attachments/1397262869543784540/1397642442274246673/IMG_20250724_021153_009.jpg?ex=68827775&is=688125f5&hm=b65a4a42af0014ab18bf32294b6e99e8b99f5895e945ad2117709fb8c0903e2a&=&format=webp&width=588&height=930')
        const dtc = new EmbedBuilder()
            .setTitle('警方初步調查報告')
            .setImage('https://media.discordapp.net/attachments/1397262869543784540/1397620005784518717/7.jpg?ex=6882628f&is=6881110f&hm=b3522c33a695de4018d32cb96403ecf2f34b989d92da94979b8382be36f28e4b&=&format=webp&width=620&height=930')
            .setFooter({ text: '遊戲中請多加利用輔助推理！', iconURL: interaction.client.user.displayAvatarURL() })
        
        await interaction.editReply({
            embeds: [dta, dtb, dtc]
        });
    }
};