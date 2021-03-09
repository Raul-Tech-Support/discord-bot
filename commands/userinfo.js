const Discord = require("discord.js")
const { prefix } = require('../config.json');

module.exports = {
    name: 'userinfo',
    description: 'Fetch info about a user.',
    aliases: ['user', 'user-info'],
    usage: '<@user>',
    permissions: 'MANAGE_MESSAGES',
    guildOnly: true,
    cooldown: 5,
    execute(message, args) {
        let member = message.mentions.members.first() || message.member
        if(!member) return message.channel.send("Lookup Failed!")
        let roleCount = member._roles.length
        let roleList = member.roles.cache.map(r => `${r}`).join(' ')
        let roleCharacters = roleList.length
        if(roleCharacters>1024){ var shownRoles = "There are too many roles to be displayed here!" } else { var shownRoles = roleList }
        const embed = new Discord.MessageEmbed()
        .setTitle(`User Info for ${member.user.tag}`)
        .setThumbnail(member.user.displayAvatarURL())
        .addField("User ID", member.id)
        .addField("Registered", member.user.createdAt)
        .addField("Joined", member.joinedAt)
        .addField(`Roles [${roleCount}]`, shownRoles)
        message.channel.send(embed)
    },
};