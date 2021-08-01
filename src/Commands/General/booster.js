const { BoosterRole, SecondTag, Tag } = global.Moderation.Defaults;

exports.run = async (Moderation, message, args) => {
    if (message.member.check([BoosterRole]) === false) return;
    if (!args || !args.length) return message.reply("sunucudaki ismini mi değiştireceksin? Değiştireceksen bir isim girmelisin.");
    const Name = `${message.author.username.includes(Tag) ? Tag : SecondTag} ${args.join(" ")}`;
    if (Name.length > 30) return message.reply("ismin 30 karakterden büyük olamaz.");
    message.member.setNickname(Name);
    message.reply(`holey be! artık ismin **${Name}** :tada:`);
};

exports.conf = {
    commands: ["booster"],
    enabled: true,
    usage: "booster [Nick]"
};
