const { MessageEmbed } = require("discord.js");
const Penal = require("../../Helpers/penal.js");
const { Ban } = global.Moderation.Permissions;
const banLimit = {};

exports.run = async (Moderation, message, args) => {
    if (message.member.check(Ban.AuthRoles) === false) return;

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || (await Moderation.getUser(args[0]));
    if (!Member) return message.channel.send("Sunucudan engellemek istediğin kullanıcıyı belirtmen gerekiyor.");
    if (Member.roles && message.author.id !== message.guild.ownerID && Member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Banlayama çalıştığın kullanıcı senden daha üst bir role sahip.");
    if (Member.roles && !Member.manageable) return message.channel.send("Etiketlediğin kişi benden yüksek bir role sahip, üzgünüm.");
    if (Member.id && Member.id === message.author.id) return message.channel.send("Kendini banlamayı neden deniyorsun ki?");

    const Reason = args.slice(1).join(" ") || "Sebep Belirtilmedi.";
    if (message.guild.ownerID !== message.author.id && Penal.limit(message.author.id, banLimit, Ban.Limit) === false) return message.channel.send(" `Ban` limitine ulaştınınız.");

    if (message.guild.members.cache.get(Member.id)) message.guild.members.ban(Member.id, { reason: Reason }).catch(console.error);
    const NewPenal = await Penal.addPenal(Member.id, message.author.id, "BAN", Reason, false, Date.now());
    const Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    message.channel.send(Embed.setDescription(`**${Member.user.tag}** adlı kullanıcı **${message.author}** tarafından **${Reason}** sebebi ile sunucudan yasaklandı.\`(#${NewPenal.Id})\``).setColor("BLACK").setImage(Ban.Image).setTimestamp()).then(x => x.delete({timeout: 10000}))
    message.react("✅")
    const Channel = message.guild.channels.cache.get(Ban.Channel);
    if (Channel) Channel.send(Embed.setDescription(`${message.author} adlı yetkili **${Reason}** sebebi ile **${Member.user.tag}** adlı kullanıcıyı sunucudan engelledi.\`(#${NewPenal.Id})\``).setColor("BLACK").setTimestamp());
}

exports.conf = { 
    commands: ["ban","yasakla","allaj"],
    enabled: true,
    usage: "ban [Üye] [Sebep]"
};