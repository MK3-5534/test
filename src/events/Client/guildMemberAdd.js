const { prefix } = require("../../config.js");
const { Activity, DiscordAPIError, Discord, AttachmentBuilder, EmbedBuilder } = require("discord.js");
const Canvas = require('canvas')
const mysql = require("mysql2")
const db = mysql.createConnection({ host: "localhost", user: "root", password: "Pic4chu2009", database: "teams" })

module.exports ={
name: "guildMemberAdd",
run: async (client, member) => {
    
    let liste = ""
    let guild = member.guild
    let guildName = member.guild.name;
    db.query("SELECT * FROM blacklist ", async (err, data, fields) => {
        for (nom in data) {
            liste += "<@"+data[nom].userID +">\n"
            if(member.id === data[nom].userID) {
                member.kick()
                member.send("**tu ne peux pas rejoindre "+ guildName +" car tu a été blacklist de tout les serveurs que je protège**")
            }
        }
    })

    db.query("SELECT * FROM guildsetting WHERE guildID = "+ member.guild.id+ "", async function (err, data, fields) {
        if(data[0].welcome === "1") {
            let salon = client.channels.cache.get(data[0].welcomeRoom)
            
            const canvas = Canvas.createCanvas(1024, 500)

            ctx = canvas.getContext("2d");

            var background = await Canvas.loadImage("./src/wallpapertip_outrun-wallpaper_76588.jpg");
            ctx.drawImage(background, 0, 0, 1024, 500);

            ctx.font = "42px Impact";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(member.user.tag.toUpperCase(), 512, 400)
            ctx.fillText("Bienvenue", 512, 450)

            ctx.beginPath();
            ctx.arc(512, 166, 119, 0, Math.PI * 2)
            ctx.closePath();
            ctx.clip();

            var avatar = await Canvas.loadImage(member.user.displayAvatarURL({
                format: "png",
                size: 1024
            }));
            ctx.drawImage(avatar, 393, 47, 238, 238);


            var embed = new EmbedBuilder()
                    .setTitle("Un Nouveau Membre !")
                    .setDescription("Bienvenue " + "<@"+member+"> sur **"+guildName+"**\n Nous somme maintenant "+member.guild.memberCount+" sur le serveur")
                    .setImage('attachment://canvas.png')
                    .setTimestamp()
            salon.send({embeds: [embed], files: [{name: "canvas.png", attachment: canvas.toBuffer()}]});
            
        }
    })

    db.query(`SELECT * FROM guildsetting WHERE guildID = ${member.guild.id}`, async function (err, data, fields) {
        if(data[0].autorole === "1") {
            let role = guild.roles.cache.get(data[0].autoroleID)
            member.roles.add(role).catch(err)
        }
    })

 }
}