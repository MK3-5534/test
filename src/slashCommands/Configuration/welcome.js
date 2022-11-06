const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require('mysql2')
const db = mysql.createConnection({ host: "localhost", user: "root", password: "Pic4chu2009", database: "teams" })

module.exports = {
    name: "welcome",
    description: "Permet d'activer le systeme de message de bienvenue",
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
            return interaction.reply("tu ne possede pas les permissions requises")
        }
       let choices = interaction.options.getBoolean("choix")
       if(choices === true) {
            db.query("UPDATE guildsetting SET welcome = 1 WHERE guildID ="+ interaction.member.guild.id+"", function (err, data, fields) {
                if(err) {
                    console.log(err);
                }
                let embed = new EmbedBuilder()
                        .setTitle("Les messages de bienvenue ont bien été activé")
                        .setTimestamp()
                        .setDescription("fais /setwelcome pour choisir le salon ou apparaitront les messages de bienvenue")
                        .setThumbnail(client.user.avatarURL())
                interaction.reply({embeds: [embed]})
            })
       }
       if(choices === false) {
        db.query("UPDATE guildsetting SET welcome = 0 WHERE guildID ="+ interaction.member.guild.id+"", function (err, data, fields) {
            if(err) {
                console.log(err);
            }
            let welcomeembed = new EmbedBuilder()
                        .setTitle("Les messages de bienvenue ont bien été désactivés")
                        .setTimestamp()
                        .setThumbnail(client.user.avatarURL())
                interaction.reply({embeds: [welcomeembed]})
        })
       }
    }
}