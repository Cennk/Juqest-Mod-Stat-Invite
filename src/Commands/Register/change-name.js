const { BoosterRole, SecondTag, Tag } = global.Moderation.Defaults;
const { Register } = global.Moderation.Permissions;
const { MessageEmbed } = require("discord.js");

exports.run = async (Moderation, message, args) => {
    if (message.member.check(Register.AuthRoles) === false) return;
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!Member || Member.user.bot || Member.id === message.author.id) return message.channel.send("Geçerli bir üye belirt!");
    if (!Member.manageable || Member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Yetkili olmayan bir üye belirt!")

    args = args.filter(a => a !== "" && a !== " ").splice(1);
    const Name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    const Age = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!Name || !Age) return message.channel.send("Geçerli isim ve yaş belirt!");

    const NewName = `${Member.user.username.includes(Tag) ? Tag : SecondTag} ${Name} | ${Age}`;
    if (NewName.length > 30) return message.channel.send("Kullanıcının adı değiştirilemedi. İsim 30 karakteri geçemez.");
    Member.setNickname(NewName);

    message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`${Member.toString()} kişisinin ismi "**${NewName.slice(2)}**" olarak değiştirildi.`)).then(x => x.delete({timeout: 10000}));
    message.react("816043389190930482")
};

exports.conf = {
    commands: ["isim", "name", "nick"],
    enabled: true,
    usage: "isim ([Nick](Booster) | [Üye] [İsim] [Yaş])"
};
