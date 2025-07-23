const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('僅供開發者使用')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('輸入字串')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.user.id != "871616467186098187") {
            await interaction.editReply({
                content: "❌｜您沒有權限使用這個指令"
            });
            return;
        }
        let txt = interaction.options.getString('text');
        eval(txt);
        await interaction.editReply({
            content: "✅｜指令成功執行"
        });
    }
};
