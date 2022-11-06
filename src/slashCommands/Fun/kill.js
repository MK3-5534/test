const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "kill",
    description: "Permet de tuer un membre",
    owner: false,
    options: [
        {
            name: "victime",
            description: "Quel est la personne a tuer ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        const membre = interaction.options.getUser("victime")
        let embed = new EmbedBuilder()
        .setTitle(interaction.member.displayName + " viens de tuer " + membre.username)
        .setImage("https://media.tenor.com/iTxJZmi5nOMAAAAd/basketball-wasted.gif")

        interaction.reply({embeds: [embed]});
    }
}