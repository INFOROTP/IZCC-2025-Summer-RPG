const { SlashCommandBuilder, EmbedBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('背景')
        .setDescription('檢視遊戲背景故事'),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const bga = new EmbedBuilder()
            .setAuthor({
                iconURL: interaction.client.user.displayAvatarURL(),
                name: interaction.client.user.tag,
            })
            .setTitle('故事背景')
            .setDescription(`某天，藥學系大二的游汐䒧出席夏夜大學藥學系一年一度的聚會「藥不藥跟我出去走一走」，期待能夠在活動中結識畢業學長姐們，並與他們的經驗分享中得到經驗。

活動中，游汐芸意想不到的巧遇兩位熟人，一是先前在系學會活動認識的大四學姊夏昕悅，另一位則是半年前剛分手的前男友，也是同系的大三學長賀承翰。

游汐芸原打算避而不見，結果好巧不巧，和賀承翰在小組 QA 的環節中被分到同組。為了能夠順利向學長姊提出想詢問的問題，游汐芸硬著頭皮開始與賀承翰討論，沒想到賀承翰的第一句話就出奇不意。

**「活動結束後，老地方見面」**前男友突然的邀約，讓游汐芸措手不及，無心專注於活動的內容。活動結束後，游汐芸準時赴約。沒想到隔天...`)
        const bgb = new EmbedBuilder()
            .setTitle('IZCC 即時新聞報導')
            .setImage('https://media.discordapp.net/attachments/1366743015867027498/1397261581364101170/image.png?ex=688114c0&is=687fc340&hm=d9e621d1a65b61726c15a7a72fcd354af0168d38f4c6b8837baba590e0714588&=&format=webp&quality=lossless&width=1156&height=724')
        const bgc = new EmbedBuilder()
            .setDescription('在警方知情案件的當下，便立即聯繫了游汐芸的家人，包括你，游汐芸的哥哥。在家人都身陷傷痛之中時，你卻對這起案件的發生充滿疑問，為了弄清事情的真相，你很快的決定投身調查。')
            .setFooter({ text: '加油，努力尋找線索，解開謎團！', iconURL: "https://media.discordapp.net/attachments/1397262869543784540/1397262937990631554/37_20250707003235.png?ex=68811604&is=687fc484&hm=25f89cb4bfadaa09cd81f699bd6b55f456107598076f460cf4900c74b1facef3&=&format=webp&quality=lossless&width=930&height=930" })
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
        
        await interaction.editReply({
            embeds: [bga, bgb, bgc],
            components: [{
                type: 1,
                components: [btn, reply, info]
            }]
        });
    }
};
