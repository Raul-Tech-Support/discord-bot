const Discord = require('discord.js');
const { version } = require('./config.json');

module.exports = {
    embed: (guildName, action, colour, desc1) => {

        const Embed = new Discord.MessageEmbed()
        .setColor(colour)
        .setTitle(guildName + ' - ' + action)
        .setDescription(desc1)
        .setFooter(`Raul Bot | Version ${version} | Developed by >> A Random Stranger <<#8514`);

    return(Embed);
    }
};
