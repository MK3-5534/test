const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require("mysql2")
const db = mysql.createConnection({   host: "localhost",   user: "root",   password: "Pic4chu2009", database: "teams" });

module.exports = {
    name: "setautorole",
    description: "Permet de configurer le role des autoroles",
    owner: false,
    options: [
        {
            name: "role",
            description: "Quel est le role a attribuer aux nouveaux membres ?",
            required: true,
            type: ApplicationCommandOptionType.Role,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        db.query("SELECT * FROM guildsetting WHERE guildID = "+ interaction.guild.id+"", function (err, data, fields) {
            if(data[0].autorole === "1") {
                if(interaction.memberPermissions.has("Administrator")) {
                    let role = interaction.options.getRole("role")
                    
                    db.query("UPDATE guildsetting SET autoroleID =   "+role.id+"  WHERE guildID = " + interaction.member.guild.id +" ", function (err, data, fields) {
                        if(err) {
                            console.log(err)
                        }
                        let embeds = new EmbedBuilder()
                                .setTitle("Autorole bien configuré !")
                                .setDescription(`le role a attribuer auw nouveaux membres est <@${role.id}>`)
                        interaction.reply({embeds: [embeds]})
                    })
        
                }
                else {
                    interaction.reply("tu ne possede pas les permissions requises")
                }
            }
            else {
                interaction.reply("L'autorole n'est pas activé")
            }
        })
        
       
    }
}