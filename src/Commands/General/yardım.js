
const { MessageEmbed } = require("discord.js");

exports.run = async(client, message, [ option ]) => {
    if (message.member.roles.highest.positon < message.guild.roles.cache.get(Moderation.Defaults.MinStaffRole).position) return;

    if (!option || !["kayıt", "cezalandırma", "yönetim", "registers"].some((_option) => option === _option))  return message.channel.send("Geçerli bir argüman girmelisin! (`kayıt`, `cezalandırma`, veya `yönetim`)");
    const Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setColor("RANDOM");

    if (option === "kayıt") {
            
            message.channel.send(Embed.setDescription(`**${message.guild.name} Adlı Sunucunun Kayıt İçin Gerekli Komutları**\n\n 1-kayıt prefixleri **.e/k/kayıt** kullanımı .kayıt @Juqêst/ID Demir 19 çıkan emojilere kullanıcının cinsiyetine göre tıklayınız.\n\n 2-isim değistirme komutu **.isim/nick/name** kullanımı .isim @Juqêst/ID Demir 19\n\n 3-Bağlantı kesme komutu **.kes/bağlantıkes** kullanımı .kes @Juqêst/ID\n\n 4-Kullanıcın eski isimlerine bakmak için gerekli komut **.isimler/nick/names** kullanımı .isimler @Juqêst/ID\n\n 5-Kullanıcıyı kayıtsıza atma komutu **.kayıtsız/kayitsiz** kullanımı .kayıtsız @Juqêst/ID\n\n`));        
    } else if (option === "cezalandırma") {
       

        message.channel.send(Embed.setDescription([
            `**${message.guild.name} Adlı Sunucunun Cezalandırma İşlemleri İçin Gerekli Komutları**.\n\n 1-Ban **.ban** kullanımı .ban @Juqêst/ID **sebep**\n\n 2-Ban Kaldırma **.unban** kullanımı .unban @Juqêst/ID\n\n 3-Cezalı/Jail **.jail/cezalandır/hapis** kullanımı .jail @Juqêst/ID **sebep**\n\n 4-Jail kaldırma **.unjail** kullanımı .unjail @Juqêst/ID\n\n 5-Süreli/Temp-Jail **.tjail/tempjail** kullanımı .tjail @Juqêst/ID **süre sebep**\n\n 6-Chat-Mute **.mute/cmute/chatmute** kullanımı .mute @Juqêst/ID **süre sebep**\n\n 7-Mute kaldırma **.unmute** kullanımı .unmute @Juqêst/ID\n\n 8-Voice-Mute **vmute/sesmute/voicemute** kullanımı .vmute @@Juqêst/ID **süre sebep**\n\n 9-Voice-Mute Kaldırma **.unvmute/vunmute** kullanımı .unvmute @Juqêst/ID\n\n 9-Atılan bir ban sebebine ve tarihine bakmak için ise **.baninfo/banbilgi** kullanımı .baninfo @Juqêst/ID\n\n`,
           
        ]));
    } else if (option === "yönetim") {
       

        message.channel.send(Embed.setDescription([
            `**${message.guild.name} Adlı Sunucunun Yönetim Komutları**\n\n 1-Aktif-Cezalar **.cezalar** kullanımı .cezalar @@Juqêst/ID **Aktif cezalar = Kullanıcının sunucuda işlenen herhangi bir cezasının var olup olmadığını gösterir.**\n\n 2-Toplu-Taşıma **.toplutaşı/toplu-taşı** kullanımı .toplutaşı **Gideceğiniz kanalın id'si**\n\n 3-Ceza-Bilgi **.cezabilgi/ceza-bilgi/cezasorgu** kullanımı .cezabilgi **Ceza Numarası**\n\n 4-Kanal-Kilitleme/Kilit-Açma **.kilit/aç/kapat** kullanımı .kilit aç **bulunduğunuz kanala yazılacak**\n\n 5-Toplu-Mute **.muteall/mute-all** kullanımı .muteall **Bulunduğunuz kanal id'si**\n\n 6-Rol-Bilgi **.üyeler/uyeler** kullanımı .üyeler @rol/ID\n\n 7-Rol-Logs **.rollog/rol-logs** kullanımı .rollog @@Juqêst/ID\n\n 8-Taşı **.taşı** kullanımı .taşı @Juqêst/ID\n\n 9-Sil **.sil** kullanımı .sil **1 ile 99 arasında bir sayı belirtiniz**\n\n 10-Toplantı **.katıldı** kullanımı .katıldı **katıldı rolü verilecek kanalda bulunmanız gerekiyor.**\n\n 11-Say kullanımı **.say**\n\n 12-Sesli **.sesli** kullanımı .sesli\n\n 13-Yetkili-Say **.ytsay/yetkilisay** kullanımı .ytsay/yetkilisay\n\n 14-Ses-Dm **.sesdm** kullanımı .sesdm/seskontrol\n\n 15-Yetkili-Çağır **.yç** kullanımı .yç evet ya da hayır **belirtilen kanalda özelden mesaj atamaz ise atamadığı yetkilileri etiketler.**\n\n 16-Slow-Mode **.slowmode** kullanımı komutun kullanıldığı kanalda .slowmode istediğin bir sayı yazarak kanalın yazma aralığını değiştirebilirsin.\n\n 17-Avatar **.avatar/av/pp** kullanımı .av @Juqêst/ID\n\n`,
         
        ]));
    } else if (option === "registers") {
       

        
        message.channel.send(Embed.setDescription([
            `**${message.guild.name}** adlı sunucunun teyitçi listesini gösteriyorum. Bu arada sen ${FindUser ? `**${Members.findIndex((item) => item.Id === message.author.id) + 1}.** sırasında bulunuyorsun! Toplam **${(FindUser.Usage.Man || 0) + (FindUser.Usage.Woman || 0)}** adet (**${FindUser.Usage.Man || 0}** erkek, **${FindUser.Usage.Woman || 0}** kadın) kayıt yapmışsın.` : "sıralamada **bulunmuyorsun.**"}\n`,
          
        ]));
    }

};

exports.conf = {
    commands: ["yardım", "t", "sıralama"],
    enabled: true,
    usage: "topstats"
};