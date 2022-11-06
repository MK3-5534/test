const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "help",
    description: "Affiche le menu help.",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {


      let helpEmbed = new EmbedBuilder()
          .setTitle("Liste des commandes")
          .setDescription("Affiche toutes les commandes")
          .setAuthor({name: "Team's"})
          .setThumbnail(client.user.avatarURL())
          .addFields({
            name: "Information :", value: "`help, ping, say, avatar, botinfo`"
          })
          .addFields({
            name: "Moderation :", value: "`warn`"
          })
          .addFields({
            name: "Fun :", value: "`kill`"
          })
          .addFields({
            name: "Owner :", value: "`bl-add, bl-list, bl-remove, leave`"
          })
        
      interaction.reply({embeds: [helpEmbed]});

   }
 }