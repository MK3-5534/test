const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, Discord } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "botinfo",
    description: "Affiche les informations du bot",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {
        let totalPeople = 0
        let botNumber = 0

        totalPeople = interaction.client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0) }, 0)
        interaction.client.guilds.cache.map(botPerson => botNumber += botPerson.members.cache.filter(member => member.user.bot).size)


        const embed = new EmbedBuilder()
        .setTitle("Informations concernant le bot")
        .setAuthor({name: "Team's"})
        .setThumbnail(client.user.avatarURL())
        .addFields({ name: "Créateur :", value: "<@936206955050041356>" })
        .addFields({ name: "🏠 Guilds :", value: interaction.client.guilds.cache.size + " servers" })
        .addFields({ name: "📄 Channels :", value: interaction.client.channels.cache.size + " channels" })
        .addFields({ name: "🤵 Total Users", value: (totalPeople - botNumber) + " users" })
        .addFields({ name: "🐏 RAM Usage", value: `${((process.memoryUsage().rss / 1024) / 1024).toFixed(2)} MB`})
        .addFields({ name: "🏓 Ping", value: `${(interaction.client.ws.ping).toFixed(0)} ms` })
        .addFields({ name: ":control_knobs: Library", value: `Discord JS v14.6.0` })

          
      interaction.reply({embeds: [embed]});

   }
 }