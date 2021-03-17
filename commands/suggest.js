const Discord = require("discord.js")
const { suggestChannelID } = require('../config.json')


module.exports = {
	name: 'suggest',
	description: `Make a suggestion.`,
	args: true,
    guildOnly: true,
    aliases: ['s', 'idea'],
	usage: '<suggestion>',
	cooldown: 300,
	async execute(message, args, client) {
        const suggestChannel = client.channels.cache.get(suggestChannelID);

        const embed = new Discord.MessageEmbed()
            .setAuthor(`Suggestion by ${message.author.tag}`, message.author.avatarURL({format: "png", dynamic: true, size: 128}))
            .setColor("#9234eb")
		    .setDescription(`${args.join(" ")}`)
        const suggestMessage = await suggestChannel.send(embed)
        suggestMessage.react("👍") && suggestMessage.react("👎")
        message.channel.send(`Thanks for your suggestion, <@${message.author.id}>!`).then(msg => msg.delete({ timeout: 10000 })) && message.delete()
    },
};
