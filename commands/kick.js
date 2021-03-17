const { Message, Client } = require('discord.js');
const Discord = require("discord.js")
var { logChannelID, version } = require('../config.json');
const em = require("../embed.js");

module.exports = {
	name: 'kick',
	description: 'Kick a user from the server.',
	usage: '<@user> <reason>',
	permissions: 'KICK_MEMBERS',
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
        if (User.hasPermission("BAN_MEMBERS" || "KICK_MEMBERS" || "ADMINISTRATOR" || "MANAGE_GUILD" || "MANAGE_ROLES")) return message.reply("You can't kick this user!")
		.then(msg => {
			msg.delete({ timeout: 10000});
		})
		let mod = '<@' + message.author + '>'
		message.delete();
		var kickReason = '';
		for(i=1; i < args.length; i++) {
			
			kickReason = kickReason + args[i] + ' ';
		}

		console.log(kickReason, args)
        if (kickReason == '') return message.reply("You must include a reason for this kick!")
		.then(msg => {
			msg.delete({ timeout: 10000});
		})

        const embed = new Discord.MessageEmbed()
        .setTitle(`You have been kicked from ${message.guild.name}`)
        .addField("Reason: ", `${kickReason}`)
	.setFooter(`Raul Bot | Version ${version} | Developed by >> A Random Stranger <<#8514`);


        await User.send(embed).catch(() => {message.reply("Failed to send user a kick DM. They likely have server DM's disabled.").then(msg => {msg.delete({ timeout: 10000})})})
		
		desc1 = '**Offender:** ' +  User1 + '\n**Reason:** ' + kickReason + '\n**Moderator:** ' + mod;

		await message.guild.members.kick(User, {reason: kickReason})
		.catch(error => message.reply(`I couldn't kick ${User.username} because of \`${error}\``)
		.then(msg => {
			msg.delete({ timeout: 30000})
			return;
		}))

		client.channels.cache.get(logChannelID).send(em.embed(message.guild.name, 'User Kicked', 'BLUE', desc1))
	},
};



