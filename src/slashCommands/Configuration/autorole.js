const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require('mysql2')
const db = mysql.createConnection({ host: "localhost", user: "root", password: "Pic4chu2009", database: "teams" })

module.exports = {
    name: "autorole",
    description: "Permet d'activer le systeme d'autorole",
    owner: false,
    options: [
        {
            name: "choix",
            description: "true ou false",
            required: true,
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if(!interaction.member.permissions.has("ADMINISTRATOR")){
            return interaction.reply("tu ne possede pas les permissions requises");
        }
       let choices = interaction.options.getBoolean("choix")
       if(choices === true) {
            db.query("UPDATE guildsetting SET autorole = 1 WHERE guildID ="+ interaction.member.guild.id+"", function (err, data, fields) {
                if(err) {
                    console.log(err);
                }
                let embed = new EmbedBuilder()
                        .setTitle("Les autoroles ont bien été activé")
                        .setTimestamp()
                        .setDescription("fais /setautorole pour choisir le role en question")
                        .setThumbnail(client.user.avatarURL())
                interaction.reply({embeds: [embed]})
            })
       }
       if(choices === false) {
        db.query("UPDATE guildsetting SET autorole = 0 WHERE guildID ="+ interaction.member.guild.id+"", function (err, data, fields) {
            if(err) {
                console.log(err);
            }
            let autoroleembed = new EmbedBuilder()
                        .setTitle("Les autoroles ont bien été désactivés")
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())
                interaction.reply({embeds: [autoroleembed]})
        })
       }
    }
}