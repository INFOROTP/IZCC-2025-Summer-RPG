const path = require('path');
const json = require(path.resolve(__dirname, '../../data.json'));

module.exports = {
    async execute(interaction) {
        await interaction.deferReply({ flags: 1 << 6 });
        let deletedChannels = [];
        for (const key in (json.play? json.DDAY_CHANNEL_ID:json.TEST_CHANNEL_ID)) {
            const channelId = json.play? json.DDAY_CHANNEL_ID[key]:json.TEST_CHANNEL_ID[key];
            const channel = await interaction.client.channels.fetch(channelId).catch(() => null);
            if (!channel || !channel.isTextBased()) continue;

            let deletedCount = 0;
            let fetchMore = true;
            while (fetchMore) {
                const messages = await channel.messages.fetch({ limit: 100 });
                if (messages.size === 0) break;
                const deletable = messages.filter(msg => (Date.now() - msg.createdTimestamp) < 14 * 24 * 60 * 60 * 1000);
                if (deletable.size === 0) break;
                await channel.bulkDelete(deletable, true);
                deletedCount += deletable.size;
                fetchMore = messages.size === 100;
            }
            deletedChannels.push(`> \`${channel.name}\`（共刪除 ${deletedCount} 則訊息）`);
        }
        await interaction.editReply({
            content: `✅ 已清空以下頻道：\n${deletedChannels.join('\n')}`
        });
    }
};
