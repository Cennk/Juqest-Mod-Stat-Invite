const { MessageEmbed } = require("discord.js");
const { ChatMute } = global.Moderation.Permissions
const Penal = require("../../Helpers/penal.js");

exports.run = async (Moderation, message, args) => {
    if (message.member.check(ChatMute.AuthRoles) === false) return

    const Member = message.mentions.members.first() || message.guild.member(args[0]) || (await Moderation.getUser(args[0]));

    if (!Member) return message.channel.send("Mutelemek istediğin kullanıcı belirtmen gerekiyor.");
    if (Member.roles && message.author.id !== message.guild.ownerID && Member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Belirttiğin kullanıcı senden üst bir rolde onu muteleyemezsin.");
    if (Member.roles && !Member.manageable) return message.channel.send("Mutelemeye çalıştığın kullanıcı benden daha üst bir role sahip.");
    if (Member.id && Member.id === message.author.id) return message.channel.send("Malesef kendini muteleyemezsin.");

    const Time = args[1] ? require("ms")(args[1]) : undefined;
    if (!Time) return message.channel.send("Gerekli bir süre belirtmen gerekiyor.");
    const Reason = args.slice(2).join(" ");
    if (!Reason) return message.channel.send("Gerekli bir sebep belirtmen gerekiyor.");

    if (Member.roles && !Member.roles.cache.has(ChatMute.Role)) Member.roles.add(ChatMute.Role).catch(console.error);

    const DateNow = Date.now(), FinishDate = DateNow + Time;
    const NewPenal = await Penal.addPenal(Member.id, message.author.id, "CHAT_MUTE", Reason, true, DateNow, FinishDate);
    const Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));
    const TimeString = Moderation.timeTR(Time);

    message.channel.send(Embed.setDescription(`${Member}-\`${Member.id}\`adlı üye metin kanallarında ${message.author}-\`${message.author.id}\` tarafından **${TimeString}** boyunca mutelendi.\`(#${NewPenal.Id})\``).setColor("BLACK").setTimestamp()).then(x => x.delete({timeout: 10000}))
    message.react("✅")
    const Channel = message.guild.channels.cache.get(ChatMute.Channel);
    if (Channel) Channel.send(Embed.setDescription(`${Member} adlı kullanıcı metin kanallarında ${TimeString} süresi boyuncu mutelendi. \n\n\Ceza Numarası:\`(#${NewPenal.Id})\`\n Chat Mute Atılma Sebebi: \`${Reason}\`\n\ Chat Mute Bitiş Tarihi: \`${new Date(FinishDate).toTurkishFormatDate()}\`\n Chat Mute Atılma Tarihi:\`${new Date(DateNow).toTurkishFormatDate()}\``).setColor("BLACK"));
};

exports.conf = {
    commands: ["chatmute", "mute", "chat-mute", "cmute"],
    enabled: true,
    usage: "mute [Üye] [Sebep]"
};