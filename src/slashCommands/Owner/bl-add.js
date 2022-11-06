const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const mysql = require('mysql2')
const db = mysql.createConnection({   host: "localhost",   user: "root",   password: "Pic4chu2009", database: "teams" });

module.exports = {
    name: "bl-add",
    description: "Permet de blacklist un membre",
    owner: true,
    options: [
        {
            name: "user",
            description: "Quel utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

      const user = interaction.options.getMember('user')
            db.query("SELECT * FROM blacklist WHERE userID = " + user.id +" ", function (err, data, fields) {
                if(data.length !== 0) return interaction.reply(`${user} est déja dans la blacklist`)
                db.query(`INSERT INTO blacklist (userID) VALUES ("${user.id}")`)
                user.send(`**Tu as été blacklist de tous les serveurs oû se trouve le bot**`)
                interaction.reply(`${user} est maintenant dans la blacklist`)
            })
        
            


    }
}