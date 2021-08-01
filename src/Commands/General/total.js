const { MessageEmbed } = require("discord.js");
const { StatsModel, UserModel, InviteModel } = require("../../Helpers/models.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = async (Moderation, message, args) => {
    if (message.member.roles.highest.positon < message.guild.roles.cache.get(Moderation.Defaults.MinStaffRole).position) return;

    const User = message.mentions.users.first() || Moderation.users.cache.get(args[0]) || message.author;
    const Data = await StatsModel.findOne({ Id: User.id }) || null;
    if (!Data) return message.channel.send("Maalesef veri bulunamadı.");
    const Embed = new MessageEmbed().setAuthor(User.tag, User.avatarURL({ dynamic: true })).setColor("RANDOM");
   
    let VoiceTotal = 0, VoiceList = '', MessageTotal = 0, MessageList = '';

    Data.Message.forEach((value, key) => {
        MessageTotal += value;
        return MessageList += `\`•\` ${Moderation.channels.cache.has(key) ? Moderation.channels.cache.get(key).toString() : "#silinmiş-kanal"}: \`${value} mesaj\`\n`;
    });

    Data.Voice.forEach((value, key) => {
        VoiceTotal += value;
        return VoiceList +=  `\`•\` ${Moderation.channels.cache.has(key) ? Moderation.channels.cache.get(key).name : "#silinmiş-kanal"}: \`${moment.duration(value).format("H [saat, ] m [dk.]")}\`\n`;
    });

    const InviteData = await InviteModel.findOne({ Id: User.id }) || { Regular: 0, Total: 0, Fake: 0, Leave: 0 };
    const Members = (await UserModel.find({ Usage: { $exists: true } }).sort({ [`Usage.Man`]: -1, [`Usage.Woman`]: -1 }).exec());
    const ListItems = Members.filter((data) => message.guild.members.cache.get(data.Id)).map((data, i) => `**\`${i + 1}.\`** <@${data.Id}>: **\`${((data.Usage || {}).Man || 0) + ((data.Usage || {}).Woman || 0)}\`** toplam (**\`${(data.Usage || {}).Man || 0}\`** erkek, **\`${(data.Usage || {}).Woman || 0}\`** kadın)`);
    if (ListItems.length < 1) return message.channel.send("Üzgünüm teyitçi verisi bulamadım.");

    let analdansikisgöttensokus = message.mentions.users.first() || Moderation.users.cache.get(args[0]) || message.author;
    const FindUser = Members.find((item) => item.Id == analdansikisgöttensokus.id);
    console.log(FindUser)


    Embed.setDescription(`${User} adlı kullanıcının genel mesaj,ses,davet ve kayıt istatistikleri;`).setTimestamp().setFooter(".total komutunu kullanarak bakabilirsiniz.").setThumbnail(User.avatarURL({ dynamic: true }))
       .addField("Genel Ses ve Mesaj İstatistikleri", `\`-\` **Genel Toplam Ses:** ${VoiceList.length > 0 ? moment.duration(Data.TotalVoice).format("\`H [saat, ] m [dk.]\`") : "Bulunamadı."}\n \`-\` **Genel Toplam Mesaj:** \`${MessageList.length > 0 ? `${Data.TotalMessage} mesaj` : "Bulunamadı."}\``)
       .addField("Genel Davet İstatistikleri",`\`-\` **Genel Toplam Davet:** \`${InviteData.Total}\`\n \`-\` **Genel Toplam Gerçek Davet:** \`${InviteData.Regular}\``)
       .addField("Genel Kayıt İstatistikleri",`\`-\` **Genel Toplam Kayıt:** \`${(FindUser.Usage.Man || 0) + (FindUser.Usage.Woman || 0)}\`\n \`-\` **Genel Toplam Kadın Kayıt:** \`${FindUser.Usage.Woman || 0}\`\n \`-\` **Genel Toplam Erkek Kayıt:** \`${FindUser.Usage.Man || 0}\``);      
       message.channel.send(Embed);
};

exports.conf = {
    commands: ["total", "totalstat","genelstat",],
    enabled: true,
    usage: "stats [Üye]"
};