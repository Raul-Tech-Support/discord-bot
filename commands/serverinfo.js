const Discord = require("discord.js")
const { prefix } = require('../config.json');

module.exports = {
    name: 'serverinfo',
    description: 'Fetch info about a server.',
    aliases: ['server'],
    cooldown: 5,
    execute(message, args) {
        let roleList = message.guild.roles.cache.map(r => `${r}`).join(' ')
        let roleCharacters = roleList.length
        if(roleCharacters>1024){ var shownRoles = "There are too many roles to be displayed here!" } else { var shownRoles = roleList }
        const embed = new Discord.MessageEmbed()
        .setTitle(`Server Info for ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL())
        .addField("Guild ID", message.guild.id)
        .addField("Members", message.guild.memberCount, true)
        .addField("Voice Reigon", message.guild.region, true)
        .addField("Owner", `${message.guild.owner}`, true)
        .addField("Channels", message.guild.channels.cache.size, true)
        .addField("Emojis", message.guild.emojis.cache.size, true)
        .addField(`Roles [${message.guild.roles.cache.size}]`, shownRoles)
        message.channel.send(embed)
    },
};