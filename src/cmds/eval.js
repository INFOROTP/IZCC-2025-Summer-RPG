const { SlashCommandBuilder } = require('discord.js');
const json = require('../../data.json');

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('僅供開發者使用')
        .setDefaultMemberPermissions(0) 
        .addStringOption(option =>
            option.setName('text')
                .setDescription('輸入字串')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ flags: 1 << 6  });
        if (!json.developers.includes(interaction.user.id)) {
            await interaction.editReply({
                content: "❌｜您沒有權限使用這個指令"
            });
            return;
        }
        let txt = interaction.options.getString('text');
        try {
            result = eval(txt);
            if (typeof result !== 'string') {
                result = require('util').inspect(result);
            }
            await interaction.editReply({
                content: `✅｜\`${txt}\` 執行回傳結果：\n\`\`\`js\n${result}\n\`\`\``
            });
        } catch (err) {
            await interaction.editReply({
                content: `❌｜執行錯誤：\n\`\`\`js\n${err}\n\`\`\``
            });
        }
    }
};
