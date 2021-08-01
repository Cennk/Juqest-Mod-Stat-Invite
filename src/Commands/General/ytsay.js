exports.run = async (Moderation, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    let Id = args[0];
if (!message.guild.roles.cache.has(Id)) return message.channel.send("Belirttiğiniz ID ile bir rol bulunamadı!").then(x => x.delete({timeout: 10000}));
 
 let tikEmoji = "816043389190930482";
 let olumsuzEmoji = "815535650060238868";
 let List;
 
let Users = message.guild.members.cache.filter(x => !x.user.bot && x.roles.cache.has(Id) && (x.user.presence.status != "offline"));
let nonVoiceChannel = Users.filter(x => !x.voice.channel);
 
await message.channel.send(`Merhabalar ${message.author}, üyelerin etiket yemesini istiyorsanız \`evet\`, istemiyorsanız \`hayır\` yazınız.`).then(async (msg) => {
  let awaitMessage = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
  if (!awaitMessage.size) return message.channel.send("Herhangi bir cevap vermediğiniz için komut iptal edildi.").then(x => { x.delete({timeout: 10000}); msg.delete(); });
  let response = awaitMessage.first();
  if (response.content.includes("evet")) {
    await msg.delete();
    await message.channel.send(`Tekrar merhabalar ${message.author}, belirttiğiniz roldeki çevrimiçi üyelerin tamamını mı yoksa sadece aktif olup seste olmayanları mı görmek istiyorsunuz? \nEğer sadece çevrimiçiler ise \`+\`, \nEğer seste olmayanlar ise \`-\` yazınız.`).then(async (msg2) => {
  let awaitMessage2 = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
  if (!awaitMessage2.size) return message.channel.send("Herhangi bir cevap vermediğiniz için komut iptal edildi.").then(x => { x.delete({timeout: 10000}); msg2.delete(); });
  let response2 = awaitMessage2.first();
  if (response2.content.includes("+")) { 
    List = Users.size > 0 ? Users.map(x => `${message.guild.members.cache.get(x.id)} - (\`${x.id}\`) ${Date.now()-x.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? message.guild.emojis.cache.get(olumsuzEmoji) : message.guild.emojis.cache.get(tikEmoji)}`).join("\n") : "Kimse bulunamadı";    await message.channel.send(List);
  } else if (response2.content.includes("-")) {
    List = nonVoiceChannel.size > 0 ? nonVoiceChannel.map(x => `${message.guild.members.cache.get(x.id)} - (\`${x.id}\`) ${Date.now()-x.user.createdTimestamp < 1000 * 60 * 60 * 24 * 7 ? message.guild.emojis.cache.get(olumsuzEmoji) : message.guild.emojis.cache.get(tikEmoji)}`).join("\n") : "Kimse bulunamadı";    await message.channel.send(List);
      };
    });
  } else if (response.content.includes("hayır")) {
await msg.delete();
    await message.channel.send(`Tekrar merhabalar ${message.author}, belirttiğiniz roldeki çevrimiçi üyelerin tamamını mı yoksa sadece aktif olup seste olmayanları mı görmek istiyorsunuz? \nEğer sadece çevrimiçiler ise \`+\`, \nEğer seste olmayanlar ise \`-\` yazınız.`).then(async (msg2) => {
  let awaitMessage2 = await message.channel.awaitMessages(x => x.author.id === message.author.id, { max: 1, time: 60000 });
  if (!awaitMessage2.size) return message.channel.send("Herhangi bir cevap vermediğiniz için komut iptal edildi.").then(x => { x.delete({timeout: 10000}); msg2.delete(); });
  let response2 = awaitMessage2.first();
  if (response2.content.includes("+")) { 
List = Users.map(x => `${message.guild.members.cache.get(x.id).displayName} - ${x.id}`).join("\n");
    await message.channel.send(`# ${message.guild.roles.cache.get(Id).name} adlı role sahip olup çevrimiçi olan kullanıcılar toplam ${Users.size} kişi kadardır! \n\n${List}`, { code: 'xl', split: true });
  } else if (response2.content.includes("-")) {
    List = nonVoiceChannel.map(x => `${message.guild.members.cache.get(x.id).displayName} - ${x.id}`).join("\n");
    await message.channel.send(`# ${message.guild.roles.cache.get(Id).name} adlı role sahip olup seste olmayan kullanıcılar toplam ${nonVoiceChannel.size} kişi kadardır! \n\n${List}`, { code: 'xl', split: true });
            };
        });
    };
});
};
exports.conf = {
    commands: ["rolbilgi", "rol-info", "rolinfo"],
    enabled: true,
    usage: "rolbilgi [Role]"
};