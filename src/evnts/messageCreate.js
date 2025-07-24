

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content == "/背景") {
            message.react('⚠️');
            message.reply({
                content: "⚠️｜請使用斜線指令 `/背景`", 
                embeds: [{
                    image: {
                        url: 'https://media.discordapp.net/attachments/1397262869543784540/1397513643880349728/qwao7-pqa9d.gif?ex=6881ff81&is=6880ae01&hm=b8d9f9e294ef6e5f032ac33aadaa605afd4760c2b8d8ae610b2781a2ba2d7e66&=&width=1458&height=468'
                    }
                }]
            });
        }
    }
};