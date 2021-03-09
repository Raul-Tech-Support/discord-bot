const { Message, Client } = require('discord.js');
var { logChannelID } = require('../config.json');
const embed = require("../embed.js");

module.exports = {
	name: 'ban',
	description: 'Ban a user for a specified reason.',
	usage: '<@user> <reason>',
	permissions: 'BAN_MEMBERS',
	cooldown: 5,
	args: true,
	guildOnly: true,
	execute(message, args, client) {
		let User = message.guild.member(message.mentions.members.first()) || message.guild.members.cache.get(args[0])
		let User1 = '<@' + message.mentions.members.first() + '>';
		if (!User) {
			console.log(User, User1)
			return message.channel.send("This user does not exist!")
			.then(msg => {
				msg.delete({ timeout: 10000});
			})
		}
        if (User.hasPermission("BAN_MEMBERS" || "KICK_MEMBERS" || "ADMINISTRATOR" || "MANAGE_GUILD" || "MANAGE_ROLES")) return message.reply("You can't ban this user!")
		.then(msg => {
			msg.delete({ timeout: 10000});
		})
		let mod = '<@' + message.author + '>'
		message.delete();
		var banReason = '';
		for(i=1; i < args.length; i++) {
			
			banReason = banReason + args[i] + ' ';
		}

		console.log(banReason, args)
        if (banReason == '') return message.reply("You must include a reason for this ban!")
		.then(msg => {
			msg.delete({ timeout: 10000});
		})

		desc1 = '**Offender:** ' +  User1 + '\n**Reason:** ' + banReason + '\n**Moderator:** ' + mod;

        User.ban({reason: banReason})

		client.channels.cache.get(logChannelID).send(embed.embed(message.guild.name, 'User Banned', 'RED', desc1))
	},
};



