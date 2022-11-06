const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require("mysql2")
const db = mysql.createConnection({   host: "localhost",   user: "root",   password: "Pic4chu2009", database: "teams" });

module.exports = {
    name: "setwelcome",
    description: "Permet de configurer le salon des messages de bienvenue",
    owner: false,
    options: [
        {
            name: "salon",
            description: "Quel est le salon ou mettre les messages de bienvenue",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        db.query("SELECT * FROM guildsetting WHERE guildID = "+ interaction.guild.id+"", function (err, data, fields) {
            if(data[0].welcome === "1") {
                if(interaction.memberPermissions.has("Administrator")) {
                    let room = interaction.options.getChannel("salon")
                    
                    db.query("UPDATE guildsetting SET welcomeRoom =   "+room.id+"  WHERE guildID = " + interaction.member.guild.id +" ", function (err, data, fields) {
                        if(err) {
                            console.log(err)
                        }
                        let embeds = new EmbedBuilder()
                                .setTitle("Message de bienvenue configuré !")
                                .setDescription("Les messages de bienvenues iront dans <#" + room.id + ">")
                        interaction.reply({embeds: [embeds]})
                    })
        
                }
                else {
                    interaction.reply("tu ne possede pas les permissions requises")
                }
            }
            else {
                interaction.reply("Les messages de bienvenue ne sont pas activés")
            }
        })
        
       
    }
}