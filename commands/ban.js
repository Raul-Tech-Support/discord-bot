const { Message, Client } = require('discord.js');
const Discord = require("discord.js")
var { logChannelID, version } = require('../config.json');
const em = require("../embed.js");

module.exports = {
	name: 'ban',
	description: 'Send a DM to a user from the bot.',
	usage: '<@user> <reason>',
	permissions: 'BAN_MEMBERS',
	cooldown: '5',
	args: true,
	guildOnly: true,
	async execute(message, args, client) {
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

        const embed = new Discord.MessageEmbed()
        .setTitle(`You were banned from ${message.guild.name}`)
        .addField("Reason: ", `${banReason}`)
	.setFooter(`Raul Bot | Version ${version} | Developed by >> A Random Stranger <<#8514`);


        await User.send(embed).catch(() => {message.reply("Failed to send user a ban DM. They likely have server DM's disabled.").then(msg => {msg.delete({ timeout: 10000})})})
		
		desc1 = '**Offender:** ' +  User1 + '\n**Reason:** ' + banReason + '\n**Moderator:** ' + mod;

		await message.guild.members.ban(User, {reason: banReason})
		.catch(error => message.reply(`I couldn't ban ${User.username} because of \`${error}\``)
		.then(msg => {
			msg.delete({ timeout: 30000})
			return;
		}))

		client.channels.cache.get(logChannelID).send(em.embed(message.guild.name, 'User Banned', 'RED', desc1))
	},
};



