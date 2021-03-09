module.exports = {
	name: 'dm',
	description: 'Send a DM to a user from the bot.',
	usage: '<@user> <message>',
	permissions: 'MANAGE_MESSAGES',
	cooldown: 5,
	args: true,
	execute(message, args) {
		let user = message.mentions.users.first();
		if (user == undefined) {
			message.channel.send(`You must mention a user to DM.`)
		}
		else {
			if (args [1] == undefined) {
				message.channel.send(`You must enter a message.`)
			}
			else {
				var msg = '';
				for(i=1; i < args.length; i++) {
					
					msg = msg + args[i] + ' ';
				}

				message.delete();
				user.send(`You have recieved a message from the ${message.guild.name} server: \n` + msg);
				message.channel.send(`DM sent to user. (Message: ${msg})`)
				.then(msg => {
					msg.delete({ timeout: 10000});
				})
			}
		}	
	},
};
