const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require('mysql2')
const db = mysql.createConnection({   host: "localhost",   user: "root",   password: "Pic4chu2009", database: "teams" });

module.exports = {
    name: "bl-list",
    description: "Permet de lister les membres qui sont blacklist",
    owner: true,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        let liste = ""
        db.query("SELECT * FROM blacklist ", async (err, data, fields) => {
            for (nom in data) {
                liste += "<@"+data[nom].userID +">\n"
            }
                

        
            const embed = new EmbedBuilder()
                .setTitle("List des blacklist")
                .addFields({
                    name: "Membres :", value: liste
                })

            interaction.reply({embeds: [embed]});
        })}
        
}