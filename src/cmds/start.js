const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const json = require('../../data.json');

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('僅供開發者使用')
        .setDefaultMemberPermissions(0),
    async execute(interaction) {
        await interaction.deferReply({ flags: 1 << 6  });
        if (!json.developers.includes(interaction.user.id)) {
            await interaction.editReply({
                content: "❌｜您沒有權限使用這個指令"
            });
            return;
        }
        const ann = await interaction.client.channels.fetch(json.play ? json.DDAY_CHANNEL_ID.RPG_ANN:json.TEST_CHANNEL_ID.RPG_ANN).catch();
        await ann.send(`@everyone\n# 🎮 RPG 遊戲開始\n遊戲的指引已經自動傳送到各小隊的 RPG 頻道，請所有小隊員仔細閱讀。活動過程中也請注意以下幾點事項：\n1. 請以__小隊為單位__團體行動，切勿落單。\n2. 如有緊急狀況（包括但不限於喝水、上廁所、身體不適等需求），請隨時告知身旁的小隊輔或工作人員。\n3. 為考量遊戲公平性，獲得的線索請勿向其他小隊透漏，也請勿以任何手段作弊，否則將斟酌情形進行扣分或取消資格處理。\n\n最後，祝大家玩得開心！✨`);

        const startEmbed1 = new EmbedBuilder()
            .setTitle('遊戲開始')
            .setAuthor({
                iconURL: "https://media.discordapp.net/attachments/1397262869543784540/1397262937990631554/37_20250707003235.png?ex=68811604&is=687fc484&hm=25f89cb4bfadaa09cd81f699bd6b55f456107598076f460cf4900c74b1facef3&=&format=webp&quality=lossless&width=930&height=930",
                name: "2025 IZCC 夏夜晚楓建景成 RPG",
            })
            .setDescription('RPG 遊戲開始！')
            .addFields([
                { name: '什麼是 RPG', value: '相信大家都聽過 RPG ，也就是角色扮演遊戲，但比較常聽到的是手機遊戲的 RPG，那在現實要如何進行呢？\n在現在所在的地點的各處，分布著由真人所扮演的 NPC，而你們的目標是通過推理、找尋線索，詢問 NPC 問題等方式，找到遊戲故事謎團背後的真相。' }
            ])
            .setColor('Yellow');
        const startEmbed2 = new EmbedBuilder()
            .setDescription('首先第一步，請在這個頻道輸入斜線指令 /背景 ，檢視遊戲的背景故事，接下來就可以開始解謎囉！')
            .setColor('Yellow')
            .setFooter({ text: '在聊天室使用斜線指令 /背景', iconURL: interaction.client.user.displayAvatarURL() });

        for (let i=0; i<5; i++) {
            const channel = await interaction.client.channels.fetch(json.play ? json.DDAY_CHANNEL_ID[`G${i}`]:json.TEST_CHANNEL_ID[`G${i}`]).catch(() => null);
            if (!channel || !channel.isTextBased()) continue;
            await channel.send({ content: `<@&${json.play ? json.DDAY_GROUP_ROLE_ID[`G${i}`]:json.TEST_GROUP_ROLE_ID[`G${i}`]}>`, embeds: [startEmbed1, startEmbed2] });
        }

        await interaction.editReply({
            content: `🎮｜開始訊息發送完成`
        });
    }
};
