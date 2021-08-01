const { MessageEmbed } = require("discord.js");
const { Tag, SecondTag, TagIntakeMode, TeamRole, MinStaffRole, BoosterRole, ChatChannel, VIP } = global.Moderation.Defaults;
const { UserModel, PointModel }= require("../../Helpers/models.js");
const { Register } = global.Moderation.Permissions;
const roles_ = require("../../roles.json").STAFF_ROLES;
let Roles = [{ Tier: 1, Id: roles_.Staff1, RequiredPoint: 7500, Roles: [roles_.Registery] }, { Tier: 2, Id: roles_.Staff2, RequiredPoint: 12500, Roles: [roles_.Registery] }, { Tier: 3, Id: roles_.Staff3, RequiredPoint: 20000, Roles: [roles_.Registery, roles_.MuteHammer] }, { Tier: 4, Id: roles_.Staff4, RequiredPoint: 25000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 5, Id: roles_.Staff5, RequiredPoint: 32500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 6, Id: roles_.Staff6, RequiredPoint: 36750, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 7, Id: roles_.Staff7, RequiredPoint: 43500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 8, Id: roles_.Staff8, RequiredPoint: 49220, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 9, Id: roles_.Staff9, RequiredPoint: 56824, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 10, Id: roles_.Staff10, RequiredPoint: 63700, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 11, Id: roles_.Staff11, RequiredPoint: 71200, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 12, Id: roles_.Staff12, RequiredPoint: 90000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 13, Id: roles_.Staff13, RequiredPoint: 100000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 14, Id: roles_.Staff14, RequiredPoint: 110000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 15, Id: roles_.Staff15, RequiredPoint: 125000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 16, Id: roles_.Staff16, RequiredPoint: 130000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 17, Id: roles_.Staff17, RequiredPoint: 140000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 16, Id: roles_.Staff16, RequiredPoint: 150000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 17, Id: roles_.Staff17, RequiredPoint: 162500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 18, Id: roles_.Staff18, RequiredPoint: 180000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 19, Id: roles_.Staff19, RequiredPoint: 197500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 20, Id: roles_.Staff20, RequiredPoint: 225000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }];

exports.run = async (Moderation, message, args) => {
    if (message.member.check(Register.AuthRoles) === false) return;

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!Member || Member.user.bot || Member.id === message.author.id) return message.channel.send("Geçerli bir üye belirt!");

    if (!Member.manageable || Member.roles.highest.position >= message.guild.roles.cache.get(MinStaffRole).position) return message.channel.send("Yetkili olmayan bir üye belirt!");
    if (message.member.check() === false && TagIntakeMode === true && !Member.user.username.includes(Tag) && !Member._roles.includes(BoosterRole)) return message.channel.send(new MessageEmbed().setDescription("Sunucumuz şuanda taglı alımdadır.Giriş yapabilmek için \`boost\` basabilir ya da tagımızı alarak  ( \`ᛘ\` ) içeriye erişim sağlayabilirsiniz.").setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor("BLACK"));

    args = args.filter(a => a !== "" && a !== " ").splice(1);
    const Name = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    const Age = args.filter(arg => !isNaN(arg))[0] || undefined;

    if (!Name || !Age) return message.channel.send("Geçerli isim ve yaş girmelisin!");
    let isim = `${Member.user.username.includes(Tag) ? Tag : SecondTag} ${Name} | ${Age}`;
    if (isim.length > 30) return message.channel.send("İsim ve yaş ile birlikte toplam 30 karakteri geçecek bir isim giremezsin.");
    const Embed = new MessageEmbed().setColor("RANDOM");
    Member.setNickname(isim).catch(console.error);

    const HistoryData = (await UserModel.findOne({ Id: Member.id }).exec()) || { History: { Names: [] } }
    if (HistoryData.History.Names) HistoryData.History.Names.reverse();

    const NewMessage = await message.channel.send(Embed.setDescription(HistoryData.History.Names.length > 0 ? [
        `Bu Kullanıcının Sunucudaki Eski İsimleri [ **${HistoryData.History.Names.length}** ]`,
        `${HistoryData.History.Names.map((data) => `\`▫️ ${data.Name}\` (${data.Reason})`).join("\n")}`] : `${Member.toString()} kişisinin ismi "**${isim.slice(2)}**" olarak değiştirildi.`
    ));

    await NewMessage.react(Register.ManEmoji);
    await NewMessage.react(Register.WomanEmoji);
    const Collector = await NewMessage.createReactionCollector((reaction, user) => [Register.ManEmoji, Register.WomanEmoji].includes(reaction.emoji.id) && user.id === message.author.id, { max: 1, time: 25000 });

    Collector.on("collect", (reaction) => {
        if (reaction.emoji.id === Register.ManEmoji) {
            Collector.stop();
            const Roles = [...Register.ManRoles];
            if (Member.user.username.includes(Tag)) Roles.push(TeamRole);
            if (Member.roles.cache.has(VIP)) Roles.push(VIP);
            Member.setRoles(Roles);
            global.updateUser(message.author.id, "Man", 1);
            global.addName(Member.id, isim, `<@&${Register.ManRoles[0]}>`);
            NewMessage.edit(Embed.setDescription(`${Member.toString()} kişisi başarıyla \`erkek\` olarak kaydedildi.`)).then(x => x.delete({timeout: 10000}));
            message.react("☑️")
        } else if (reaction.emoji.id === Register.WomanEmoji) {
            Collector.stop();
            const Roles = [...Register.WomanRoles];
            if (Member.user.username.includes(Tag)) Roles.push(TeamRole);
            if (Member.roles.cache.has(VIP)) Roles.push(VIP);
            Member.setRoles(Roles);
            global.updateUser(message.author.id, "Woman", 1);
            global.addName(Member.id, isim, `<@&${Register.WomanRoles[0]}>`);
            NewMessage.edit(Embed.setDescription(`${Member.toString()} kişisi başarıyla \`kadın\` olarak kaydedildi.`)).then(x => x.delete({timeout: 10000}));
            message.react("☑️")
        }
    });

    Collector.on("end", () => {
        Collector.stop();
        NewMessage.reactions.removeAll();
    	let MemberRoles = Member.roles.cache;
    	let StaffRoles = MemberRoles.filter(x => (x.id === roles_.Staff1 || x.id === roles_.Staff2 || x.id === roles_.Staff3 || x.id === roles_.Staff4 || x.id === roles_.Staff5 || x.id === roles_.Staff6 || x.id === roles_.Staff7 || x.id === roles_.Staff8 || x.id === roles_.Staff9 || x.id === roles_.Staff10 || x.id === roles_.Staff11 || x.id === roles_.Staff12 || x.id === roles_.Staff13 || x.id === roles_.Staff14 || x.id === roles_.Staff15 || x.id === roles_.Staff16 || x.id === roles_.Staff17 || x.id === roles_.Staff18 || x.id === roles_.Staff19 || x.id === roles_.Staff20));
    	let highestRole;
    	let Array_ = [];
    PointModel.findOne({ Id: message.author.id }, async (err, res) => {
        if (StaffRoles.size <= 0) return;
        if (StaffRoles.size >= 2) {
            StaffRoles.forEach(value => {
                Array_.push({ Id: value.id, Pos: value.position });
            });

            if (Array_.some(x => x.Id === Member.roles.highest.id)) { Array_ = Array_.filter(x => x.Id === Member.roles.highest.id); highestRole = Array_.map(x => x.id).toString(); }
            else { highestRole = Array_.random(); }
        } else if (StaffRoles.size < 2) {
            highestRole = StaffRoles.map(x => x.id).toString();
        };
        let doc = Roles.find(x => x.Id === highestRole);
        let state = doc.Tier < 20 ? false : true;
        if (!res) {
            let model = new PointModel({
                Id: message.author.id,
                Point: 5,
                RequiredPoint: doc.RequiredPoint,
                Tier: doc.Tier,
                Max: state
            }).save();
        } else {
            PointModel.updateOne({ Id: message.author.id }, { $inc: { Point: 5 } }).exec();
        };
    });
        const Channel = Moderation.channels.cache.get(ChatChannel);
        if (Channel) Channel.send(`${Member} aramıza katıldı haydi ona hoş geldin diyelim!`);
    });
};

exports.conf = {
    commands: ["kayıt", "e", "k", "erkek", "kız", "kadın", "bayan", "bay"],
    enabled: true,
    usage: "kayıt [Üye]"
};
