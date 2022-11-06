const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "leave",
    description: "Permet de quitter un serveur",
    owner: false,
    options: [
        {
            name: "guild",
            description: "Quel est l'id du serveur a quitter",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        let guildID = interaction.options.getString("guild")
        let toto = client.guilds.cache.get(guildID)

        if(interaction.member.id === "936206955050041356") {
            toto.leave()
            let leaveEmbed = new EmbedBuilder()
                    .setTitle("J'ai bien quitté " + toto.name)
                    .setDescription(" il avait " + toto.memberCount + "membres")
            interaction.reply({embeds: [leaveEmbed]})
        }
        else {
            interaction.reply({content: "cette commande est seulement disponible pour le créateur du bot", ephemeral: true})
        }
    }
}