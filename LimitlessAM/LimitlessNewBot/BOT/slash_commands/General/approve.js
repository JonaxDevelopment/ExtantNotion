const { SlashCommandBuilder } = require('@discordjs/builders'); // Literally required.
const { QuickDB } = require("quick.db")
const db = new QuickDB();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('approve')
		.setDescription('Approve a livery')
        .addStringOption(option =>
            option.setName('livery')
                .setDescription('Enter the livery id.')
                .setRequired(true))
        .addStringOption(option =>
             option.setName('user')
                 .setDescription('Enter the users id.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('model')
                 .setDescription('Enter the planes model.')
                .setRequired(true)),      
	async run(client, interaction) {
        const liveryid = interaction.options.getString('livery')
        const model = interaction.options.getString('model')
        const user = interaction.options.getString('user')
        await db.add(`${user}_${model}`, liveryid);
        interaction.reply('✅ Successfully added details to database.')
	},
};