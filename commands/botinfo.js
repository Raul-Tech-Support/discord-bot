module.exports = {
	name: 'botinfo',
	description: 'Get information about the bot.',
	execute(message) {
		message.channel.send(`This is the official bot for the ${message.guild.name} server. It\'s currently W.I.P. for any bugs or suggestions please contact <@369055803677605889>.`);
	},
};
