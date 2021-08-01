const { StatsModel } = require("../../Helpers/models.js");
const { MessageEmbed } = require("discord.js");

exports.run = async (Moderation, message, args) => {
    if (message.guild.ownerID !== message.author.id && !Moderation.Defaults.Developers.includes(message.author.id)) return;
    
    const newData = new Map();
    await StatsModel.updateMany({}, { Voice: newData, Message: newData });
    message.channel.send(new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor("RANDOM").setDescription("Başarıyla **haftalık** istatistikler silindi."));
};

exports.conf = {
    commands: ["reset-stats"],
    enabled: true,
    usage: "reset-stats"
};
