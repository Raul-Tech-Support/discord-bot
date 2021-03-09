module.exports = {
	name: 'say',
	description: 'Say something as the bot.',
	permissions: 'MANAGE_MESSAGES',
	args: true,
	execute(message, args) {	
		message.delete().catch(O_o=>{});
		message.channel.send(args.join(" "))
	},
};