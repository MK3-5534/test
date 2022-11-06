const { prefix } = require("../../config.js");
const { Activity, ActivityType } = require("discord.js");

module.exports ={
name: "ready",
run: async (client) => {
    console.log(`Le bot ${client.user.username} est prêt !`);
    client.user.setActivity(`${client.guilds.cache.size} serveurs`, { type: ActivityType.Watching });
    client.guilds.cache.forEach(guild => {
        console.log(guild.name)      
    })
    
 }
}