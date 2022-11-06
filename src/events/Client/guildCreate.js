const { prefix } = require("../../config.js");
const { Activity } = require("discord.js");
const mysql = require("mysql2")
const db = mysql.createConnection({ host: "localhost", user: "root", password: "Pic4chu2009", database: "teams" })

module.exports ={
name: "guildCreate",
run: async (client, guild) => {

    db.query(`INSERT INTO guildsetting (guildID) VALUES ("${guild.id}")`, function (err, data, fields) {
        if(err) {
            console.log(err)
        }
    })

 }
}