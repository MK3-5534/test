const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, Discord } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "serverlist",
    description: "Affiche la liste des serveurs",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {
        let embed = new EmbedBuilder()
                .setTitle("Liste des serveurs")
                .setThumbnail(client.user.avatarURL())
                .setAuthor({name: client.user.username})
                client.guilds.cache.forEach((guild) => {
                    embed.addFields({
                        name: guild.name, value: guild.memberCount + " membres."
                    })
                })

        interaction.reply({embeds: [embed]});
    }
 }