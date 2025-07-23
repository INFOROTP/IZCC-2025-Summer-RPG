module.exports = {
    name: 'map',
    async execute(interaction) {
        await interaction.reply({
        	content: 'https://cpo.ntu.edu.tw/map/B_01.jpg',
            flags: 1 << 6 
        })
    }
};