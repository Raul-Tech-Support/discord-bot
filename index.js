/*
Raul Bot
V1.0
Developed by >> A Random Stranger <<#8514
raul@starcraft.uk
*/

const fs = require('fs');
const Discord = require('discord.js');
const { blacklisted1 } = require('./badwords.json');
const { prefix, token } = require('./config.json');
const { Console } = require('console');
const ban = require("./commands/ban.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(`${prefix}help`);
});

client.on('message', message => {
	
    let found = false;
    for (var i in blacklisted1) {
      if (message.content.toLowerCase().includes(blacklisted1[i].toLowerCase())) found = true;
    }
    if (found) {
      
		message.channel.send("This word is prohibited.");
		desc1 = '**Offender:** ' +  User1 + `\n**Reason:** Using a blacklisted word (${message.content})` + '\n**Moderator:** AutoMod';
		message.delete();
		client.channels.cache.get(logChannelID).send(embed.embed(message.guild.name, 'Message Deleted', 'BLACK', desc1))
	}
	
	if(message.content.startsWith(prefix + 'uptime'))
	{
		let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        const embed = new Discord.MessageEmbed()
           .setTitle(`Uptime`)
           .addField("Days", `${days}`)
           .addField("Hours", `${hours}`)
           .addField("Minutes", `${minutes}`)
           .addField("Seconds", `${seconds}`)
       message.channel.send(embed);
	}

	if(message.content.startsWith(prefix + 'ping'))
	{
		message.channel.send("Pinging...").then(m =>{
			var ping = m.createdTimestamp - message.createdTimestamp;
	  
			var embed = new Discord.MessageEmbed()
			.setAuthor(`Your ping is ${ping} ms`)
			
			m.delete()
			message.channel.send(embed)
		});
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You do not have permission to do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


/* The below was experimental and does not work

client.on('messageReactionAdd', async (reaction, user) => {
	
	console.log(user.id, reaction.count);

	//setTimeout(() => timestamps.delete(user.id), cooldownAmount);

	if (reaction.message.partial) {
		try {
			await reaction.message.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
		}
	}

	if ((reaction.emoji.name == '⭐') && (reaction.count == 1) && (reaction.message.channel != '803687292619063306') && (user.id != '800196128314228736'))
	{
		client.channels.cache.get('803687292619063306').send(`"${reaction.message.content}" - ${reaction.message.author}`) //Remember to use correct channel ID!
		.then(msg => {
			reaction.message.react('⭐', { timeout: 1000})
		})
		
	}

	else if ((reaction.emoji.name == '🖕') && (reaction.count <= 1) && (reaction.message.channel != '803687292619063306'))
	{
		reaction.message.react('🖕');
		reaction.message.channel.send('<@' + user.id + "> you are a neek.")
		.then(msg => {
			msg.delete();
		})
	}
});
*/

client.login(token);
