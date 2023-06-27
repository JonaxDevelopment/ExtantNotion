const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require("discord.js");
const prefix = require("./config.json").prefix


const express = require('express');
const app = express();
const port = 3000;
 

 
app.listen(port, () => console.log(`localhost:${port}`));

const client = new Client({
	  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"],
    presence: {
        status: "dnd",
    },
});
client.on("ready", () => {
    console.log(`${client.user.username} ✅`);
 // console.log(`Streaming ${status}`);
     client.user.setActivity(`Limitless Moderation`, {
			type: "WATCHING" 
		 });
         app.get('/', (req, res)  =>{
          res.send('UP')
    

          const Approve = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('ApproveButton')
                  .setLabel('Approve')
                  .setStyle('SUCCESS'),
          );
          const Decline = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('DeclineButton')
                  .setLabel('Decline')
                  .setStyle('DANGER'),
          );
          const embed = new MessageEmbed()
          .setTitle("Limitless Airline Manager")
          .setColor('#0099ff')
          .addFields(
            { name: 'Useername', value: 'Jonax' },
            { name: 'Asset ID Link', value: `https://www.roblox.com/library/144242/Sky`, inline: true },
        )
        .setThumbnail("https://tr.rbxcdn.com/b733125860461bf315acba20146a87ee/150/150/Image/Png")
          .setTimestamp()
          .setURL('https://www.roblox.com/games/8945226556/Limitless-Airline-Manager')
          .setDescription('Livery Approval System')
          .setFooter({ text: 'Limitless AI', iconURL: 'https://tr.rbxcdn.com/b733125860461bf315acba20146a87ee/150/150/Image/Png' });


          client.guilds.cache.get("1121098807543861288").channels.cache.get("1121441470088499361").send({
            embeds: [embed],
			components: [Approve,Decline],
		})
         })
});

client.on('interactionCreate', async interaction => {
    if(interaction.isButton()) {
        if(interaction.customId == 'ApproveButton') {
            const Approve = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('ApproveButton')
                  .setLabel('Approve')
                  .setStyle('SUCCESS')
                  .setDisabled(true)
          );
          const Decline = new MessageActionRow()
          .addComponents(
              new MessageButton()
                  .setCustomId('DeclineButton')
                  .setLabel('Decline')
                  .setStyle('DANGER')
                  .setDisabled(true)
          );
            await interaction.deferUpdate();
            await interaction.editReply({ content: `Successfully approved livery. ${interaction.embeds.title}`, components: [Approve,Decline] });
        }
    }
});

module.exports = client;

const mongoose = require('mongoose')

// mongoose.connect(process.env.mongodb,/*Put Your Mongoose Connection String In A Secrect Enviroment*/ {
// useUnifiedTopology: true,
// useNewUrlParser: true,
// }).then(console.log('Mongodb ✅'))



client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);


client.login("MTEyMTQ4MjUxNzIyMDk2NjUxMQ.GxzzdZ.gp3eHHZK3YVlLsQA-RAfvdXsplo_4DjS9lWUIA"); //Put Your Bots Token In A Secrect Enviroment