const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "warn",
    description: "Permet d'avertir un membre",
    owner: false,
    options: [
        {
            name: "membre",
            description: "Quel est le membre a avertir ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "raison",
            description: "Quelle est la raison ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        let criminel = interaction.options.getMember("membre")
        const reason = interaction.options.getString("raison")
        if(!interaction.memberPermissions.has("Administrator")) return interaction.reply({content: "Vous n'avez pas les permissions requises", ephemeral: true});
        let warnEmbed = new EmbedBuilder()
                .setTitle("Warn sur " + interaction.guild.name)
                .setAuthor({name: interaction.member.displayName})
                .setThumbnail(client.user.avatarURL())
                .addFields(
                    { name: "Modérateur :", value: "<@" + interaction.member.id + ">" },
                    { name: "Délinquant :", value: "<@" + criminel.id + ">" },
                    { name: "Raison :", value: reason }
                )
                
        interaction.reply({embeds: [warnEmbed]});
        criminel.send({embeds: [warnEmbed]});

        
    }
}