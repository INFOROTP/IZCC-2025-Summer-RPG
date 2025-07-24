const { InteractionType } = require('discord-api-types/v10');
const chalk = require('chalk')
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const json = require(path.resolve(__dirname, '../data.json'));
const REC_CHANNEL_ID = json.REC_CHANNEL_ID;

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand: {
                const cmd = client.commands.get(interaction.commandName);
                if (!cmd) return;
                try {
                    await console.log(chalk.greenBright(`指令使用 `) + chalk.white(`${interaction.user.tag} 使用了指令 ${interaction.commandName}`))
                    await (await client.channels.fetch(REC_CHANNEL_ID)).send(` \`\`\`js
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
                    await (await client.channels.fetch(REC_CHANNEL_ID)).send({
                        content: `<@871616467186098187>`,
                        embeds: [
                            new EmbedBuilder()
                            .setAuthor({
                                iconURL: client.user.displayAvatarURL(),
                                name: client.user.tag,
                            })
                            .setTitle('機器人發生' + err.name + '錯誤')
                            .setDescription('```' + err + '```')
                            .setColor('rgba(194, 83, 83, 1)')
                        ]
                    });
                };
                break;
            }
            case InteractionType.MessageComponent: {
                const { customId } = interaction;
                // reptN_start / reptN_leave
                if (/^rept[0-4]_(start|leave)$/.test(customId)) {
                    const teamIdx = Number(customId[4]);
                    const action = customId.endsWith('start') ? '開始' : '離開';
                    await interaction.update({
                        content: `✅｜已回報「${teamIdx} 小」小隊${action}！`,
                        components: [],
                        ephemeral: true
                    });

                    const channel = await client.channels.fetch(json.DDAY_CHANNEL_ID.NPC_REPORT);
                    const msg = await channel.messages.fetch("1397638004289310732");
                    const embed = msg.embeds[0]?.toJSON() || { fields: [] };
                    for (let i = 0; i < 5; i++) {
                        embed.fields[i] ??= { name: `${i} 小`, value: '', inline: true };
                    }
                    embed.fields[teamIdx].value = action === '開始'
                        ? `<@${interaction.user.id}>`
                        : '';

                    await msg.edit({ embeds: [embed] });
                    return;
                }
                const btnHandler = client.buttons.get(customId);
                if (!btnHandler) return;
                await (await client.channels.fetch(REC_CHANNEL_ID)).send(` \`\`\`js
[${interaction.guild.name}] | [${interaction.user.tag}] | 使用了按鈕 ${customId}
\`\`\``);
                btnHandler.execute(interaction);
                break;
            }
        }
    }
};