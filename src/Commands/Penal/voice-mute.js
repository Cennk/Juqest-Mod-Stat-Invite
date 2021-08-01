const { MessageEmbed } = require("discord.js");
const { VoiceMute } = global.Moderation.Permissions;
const Penal = require("../../Helpers/penal.js");

exports.run = async (Moderation, message, args) => {
    if (message.member.check(VoiceMute.AuthRoles) === false) return

    const Member = message.mentions.members.first() || message.guild.member(args[0]) || (await Moderation.getUser(args[0]));
    if (!Member) return message.channel.send("Susturulacak olan geçerli üyeyi belirtiniz.");
    if (Member.roles && message.author.id !== message.guild.ownerID && Member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Kullanıcı senden daha üst bir rolde.");
    if (Member.roles && !Member.manageable) return message.channel.send("Kullanıcı benden üst bir role sahip");
    if (Member.id && Member.id === message.author.id) return message.channel.send("Kendini muteleyemezsin.");

    const Time = args[1] ? require("ms")(args[1]) : undefined;
    if (!Time) return message.channel.send("Susturmak için bir süre belirtmen gerekiyor");
    const Reason = args.slice(2).join(" ");
    if (!Reason) return message.channel.send("Susturmak için bir süre belirtmen gerekiyor");

    if (Member.voice.channelID) Member.voice.setMute(true);

    const DateNow = Date.now(), FinishDate = DateNow + Time;
    const NewPenal = await Penal.addPenal(Member.id, message.author.id, "VOICE_MUTE", Reason, true, DateNow, FinishDate);
    const Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

    message.channel.send(Embed.setDescription(`${Member}-\`${Member.id}\` ${Moderation.timeTR(Time)} boyunca ses kanallarında mutelendi.\`(#${NewPenal.Id})\``).setColor("BLACK").setTimestamp()).then(x => x.delete({timeout: 10000}));
    message.react("✅")
    const Channel = message.guild.channels.cache.get(VoiceMute.Channel);
    if (Channel) Channel.send(Embed.setDescription(`${Member} kullanıcısı ses kanallarında mutelendi.\n\n\ Mute Atılış Tarihi:\` ${new Date(DateNow).toTurkishFormatDate()}\` \n Mute Bitiş Tarihi:\`${new Date(FinishDate).toTurkishFormatDate()}\n Mute Atılma Sebebi:\` ${Reason}\``).setColor("RANDOM"));
};

exports.conf = {
    commands: ["voicemute", "sesmute", "vm", "vmute", "smute"],
    enabled: true,
    usage: "voicemute [Üye] [Sebep]"
};