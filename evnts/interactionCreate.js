const { InteractionType } = require('discord-api-types/v10');
const chalk = require('chalk')
const { EmbedBuilder } = require('discord.js');
const json = require('../data.json');
const REC_CHANNEL_ID = json.REC_CHANNEL_ID;

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand: {
                const cmd = interaction.client.commands.get(interaction.commandName);
                if (!cmd) return;
                try {
                    await console.log(chalk.greenBright(`指令使用 `) + chalk.white(`${interaction.user.tag} 使用了指令 ${interaction.commandName}`))
                    await (await interaction.client.channels.fetch(REC_CHANNEL_ID)).send(` \`\`\`js
[${interaction.guild.name}] | [${interaction.user.tag}] | 使用了指令 ${interaction.commandName}
\`\`\``);
                    if (!json.developers.includes(interaction.user.id) && json.play==false) {
                        await interaction.reply({
                            content: "RPG 遊戲尚未開啟，請期待第三天的活動！",
                            flags: 1 << 6 
                        });
                        return;
                    }
                    await cmd.execute(interaction);
                } catch (err) {
                    if (err) console.error(err);
                    if (interaction.deferred) {
                        interaction.editReply({
                            content: `💥｜執行指令的過程中發生錯誤 \`${err.name}\``,
                            ephemeral: true
                        });
                    } else {
                        interaction.reply({
                            content: `💥｜執行指令的過程中發生錯誤 \`${err.name}\``,
                            ephemeral: true
                        });
                    }
                    await (await interaction.client.channels.fetch(REC_CHANNEL_ID)).send({
                        content: `<@871616467186098187>`,
                        embeds: [
                            new EmbedBuilder()
                            .setAuthor({
                                iconURL: interaction.client.user.displayAvatarURL(),
                                name: interaction.client.user.tag,
                            })
                            .setTitle('機器人發生' + err.name + '錯誤')
                            .setDescription('```' + err + '```')
                            .setColor('rgba(194, 83, 83, 1)')
                        ]
                    });
                };
            }
            case InteractionType.MessageComponent: {
                const { customId } = interaction;
                const cmd = interaction.client.buttons.get(customId) || undefined;
                if (!cmd) return;
                await (await interaction.client.channels.fetch(REC_CHANNEL_ID)).send(` \`\`\`js
[${interaction.guild.name}] | [${interaction.user.tag}] | 使用了按鈕 ${customId}
\`\`\``);
                cmd.execute(interaction);
            }
        }
    }
};