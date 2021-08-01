const { Meeting } = global.Moderation.Permissions;

exports.run = async (Moderation, message) => {
    if (message.member.check() === false) return;

    if (!message.member.voice.channelID) return message.channel.send("Lütfen toplantı ses kanalına geç ve dene!");
    const Guild = message.guild;
    const Channel =message.member.voice.channel;
    const LogChannel = message.guild.channels.cache.get(Meeting.Log);

    Guild.members.cache.filter((member) => !member.user.bot && !Channel.members.keyArray().includes(member.id) && member.roles.cache.has(Meeting.Role)).forEach((member) => member.roles.remove(Meeting.Role).catch(() => undefined));
    Channel.members.filter((member) => !member.user.bot && !member.roles.cache.has(Meeting.Role)).forEach((member) => member.roles.add(Meeting.Role).catch(() => undefined));
    message.channel.send(`\`${Channel.name}\` odasındaki \`${Channel.members.size}\` adet üyeye toplantı'ya katıldı rolü verildi ve \`${LogChannel}\` adlı kanala loglandı!`);
    LogChannel.send([
        `\`${require("moment")(Date.now()).tz("Europe/Istanbul").format("YYYY.MM.DD | HH:mm")}\` tarihinde ${message.author} adlı yetkili tarafından \`${Channel.name}\` odasındaki \`${Channel.members.size}\` adet üyeye toplantıya katıldı. rolü verildi! Katılan üyeler;`,
        `\n${Channel.members.map((member) => `${member} (\`${member.id}\`)`).join("\n")}`
    ], { split: true });
};

exports.conf = {
    commands: ["toplantı", "meet", "metting", "meeting", "meetting", "topl"],
    enabled: true,
    usage: "toplantı"
};