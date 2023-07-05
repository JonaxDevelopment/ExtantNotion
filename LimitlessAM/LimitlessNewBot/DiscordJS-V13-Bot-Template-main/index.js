const { Client, Collection, MessageEmbed } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");
const config = require("./config.json");
const express = require('express');
const noblox = require("noblox.js")
const port = 3000;
const app = express();

// Creating a new client:
const client = new Client({
    intents: 32767
});
client.on("ready", () => {
    console.log(`${client.user.username} ✅`);
 // console.log(`Streaming ${status}`);
     client.user.setActivity(`Limitless Moderation`, {
			type: "WATCHING" 
		 });
         app.get('/v1/livery/:userid/:liveryid/:planemodel', async (req, res)  =>{
          res.send('UP')
          const userid = req.params.userid
          const liveryid = req.params.liveryid
          const planemodel = req.params.planemodel
          let username = await noblox.getUsernameFromId(userid)
          const embed = new MessageEmbed()
          .setTitle("Limitless Airline Manager")
          .setColor('#0099ff')
          .addFields(
            { name: 'Username', value: username },
            { name: 'Asset ID Link', value: `https://www.roblox.com/library/${liveryid}`, inline: true },
        )
        .setThumbnail("https://tr.rbxcdn.com/b733125860461bf315acba20146a87ee/150/150/Image/Png")
          .setTimestamp()
          .setURL('https://www.roblox.com/games/8945226556/Limitless-Airline-Manager')
          .setDescription(`Livery Approval System. \n Please type in /approve or /decline **${userid}** **${liveryid}** in this channel to moderate the livery.`)
          .setFooter({ text: 'Limitless AI', iconURL: 'https://tr.rbxcdn.com/b733125860461bf315acba20146a87ee/150/150/Image/Png' });


          client.guilds.cache.get("1121098807543861288").channels.cache.get("1121441470088499361").send({
            embeds: [embed]
		})
         })
});
// Creating a new host with express:

app.listen(port, () => console.log("[EXPRESS] Express is ready."));

// Collections and handler:
client.commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.categories = fs.readdirSync("./commands");

// Exporting the modules:
module.exports = client;

// Handler:
["prefix", "slash", "event"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

// Anticrash handler:
process.on('unhandledRejection', err => {
    console.log(`[ERROR] Unhandled promise rejection: ${err.message}.`);
    console.log(err);
});

// Login to the bot:
const AUTH = process.env.TOKEN || config.client.TOKEN;
if (!AUTH) {
    console.warn("[WARN] You need to provide a Bot token!").then(async () => process.exit(1));
} else {
    client.login(AUTH).catch(() => console.log("[WARN] It seems like the token is invalid, please recheck it. If the this error stills showing, then enable the 3 Gateaway Intents."));
}