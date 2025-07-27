const { SlashCommandBuilder } = require('discord.js');
const json = require('../../data.json');

module.exports = {
    dev: true,
    data: new SlashCommandBuilder()
        .setName('cmd')
        .setDescription('僅供開發者使用')
        .setDefaultMemberPermissions(0) 
        .addSubcommand(subcommand => subcommand
			.setName('refresh')
			.setDescription('僅供開發者使用')),
    async execute(interaction) {
        if (!json.developers.includes(interaction.user.id)) {
            await interaction.reply({
                content: "❌｜您沒有權限使用這個指令",
                flags: 1 << 6 
            });
            return;
        }
        const subcmd = interaction.options.getSubcommand();
        require(`./cmd/${subcmd}.js`).execute(interaction);
    }
};
