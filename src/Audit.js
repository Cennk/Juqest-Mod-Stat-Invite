const { patch } = require("axios");
const { Client, MessageEmbed } = require("discord.js");
const Audit = new Client({ fetchAllMembers: true });
const Mongoose = require("mongoose");
const { UnregisterRoles, BannedTags, Status, DatabaseName, BannedTagsRole, Tag, SecondTag, TeamRole, TagIntakeMode, AuditBotToken, BoosterRole, Prefix, VIP, ServerID, VoiceChannelID } = require("../global.json").Defaults;
const CooldownXP = new Set();
const Swears = ["allahoc", "allahoç", "allahamk", "allahaq", "0r0spuc0cu", "4n4n1 sk3r1m", "p1c", "p1ç", "@n@nı skrm", "orsb", "orsbcogu", "amnskm", "anaskm", "mk", "amk", "oc", "ag", "fuck", "seks", "sex", "0c", "ambiti", "am biti", "amcik", "amck", "amckl", "amina", "aminakoyarim", "amina koyarim", "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amm", "ammak", "ammna","amnda", "amndaki", "amngtn", "amq", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan", "anani", "ananin", "ananisikerim", "anani sikerim", "ananisikeyim", "anani sikeyim", "anann", "anasi", "anasinin", "anay", "anayin", "anneni", "annenin", "annesiz", "anuna", "aq", "a.q", "a.q.", "aq.", "babani", "bacini", "bacn", "bacndan", "bacy", "bastard", "beyinsiz", "bitch", "boner", "bosalmak", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "dallama", "daltassak", "dalyarak", "dangalak", "dassagi","kaltak", "kancik", "kappe", "karhane", "kavat", "kaypak", "kerane", "kerhane", "kerhanelerde", "kevase", "kevvase", "kodumun", "kodumunun", "koduumun", "koyarm", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "madafaka", "malafat", "malak", "mcik", "memelerini", "mincikliyim", "mna", "motherfucker", "oc", "ocuu", "o.ç", "o.ç.", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospudur", "orospular", "orospunun", "orospunun evlad\u0131", "orospuydu", "orospuyuz", "orostopol", "orrospu", "oruspu", "osbir", "otuzbir", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevenk", "pezo", "pic", "picler", "pipi", "porno", "pussy", "rahminde", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "saxo", "serefsiz", "sexs", "sie", "sik", "sikdi", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikeyim", "sikeym", "sikicem", "sikici", "sikiiim", "sikiiimmm", "sikiim", "sikiirken", "sikik", "sikilmi", "sikilmie", "sikilmis", "sikilsin", "sikim", "sikimde",  "sikime", "sikimi"];
const Warning = {};
let roles_ = require("./roles.json").STAFF_ROLES;
let Roles = [{ Tier: 1, Id: roles_.Staff1, RequiredPoint: 7500, Roles: [roles_.Registery] }, { Tier: 2, Id: roles_.Staff2, RequiredPoint: 12500, Roles: [roles_.Registery] }, { Tier: 3, Id: roles_.Staff3, RequiredPoint: 20000, Roles: [roles_.Registery, roles_.MuteHammer] }, { Tier: 4, Id: roles_.Staff4, RequiredPoint: 25000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 5, Id: roles_.Staff5, RequiredPoint: 32500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 6, Id: roles_.Staff6, RequiredPoint: 36750, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 7, Id: roles_.Staff7, RequiredPoint: 43500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer] }, { Tier: 8, Id: roles_.Staff8, RequiredPoint: 49220, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 9, Id: roles_.Staff9, RequiredPoint: 56824, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 10, Id: roles_.Staff10, RequiredPoint: 63700, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 11, Id: roles_.Staff11, RequiredPoint: 71200, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 12, Id: roles_.Staff12, RequiredPoint: 90000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 13, Id: roles_.Staff13, RequiredPoint: 100000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 14, Id: roles_.Staff14, RequiredPoint: 110000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer] }, { Tier: 15, Id: roles_.Staff15, RequiredPoint: 125000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 16, Id: roles_.Staff16, RequiredPoint: 130000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 17, Id: roles_.Staff17, RequiredPoint: 140000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 16, Id: roles_.Staff16, RequiredPoint: 150000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 17, Id: roles_.Staff17, RequiredPoint: 162500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 18, Id: roles_.Staff18, RequiredPoint: 180000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 19, Id: roles_.Staff19, RequiredPoint: 197500, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }, { Tier: 20, Id: roles_.Staff20, RequiredPoint: 225000, Roles: [roles_.Registery, roles_.MuteHammer, roles_.VoiceMuteHammer, roles_.JailHammer, roles_.BanHammer] }];


Mongoose.connect("".replace("<dbname>", DatabaseName), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const { LevelModel, StatsModel, PenalModel, PointModel, TaskModel } = require("./Helpers/models.js");

Audit.once("ready", () => {
    Audit.user.setPresence({ activity: { name: "ᛘ Aresta" }, status: "idle" });
    Audit.guilds.cache.get(ServerID).channels.cache.get(VoiceChannelID).join().catch();

    setInterval(() => {
            const guild = Audit.guilds.cache.first()
            guild.members.fetch().then((members) => {

                members.filter((member) => member.roles.cache.has(BannedTagsRole) && BannedTags.some((tag) => !member.user.username.includes(tag))).forEach((member) => setRoles(member, UnregisterRoles));
                members.filter((member) => BannedTags.some((tag) => member.user.username.includes(tag)) && !member.roles.cache.has(BannedTagsRole)).forEach((member) => setRoles(member, BannedTagsRole));
                members.filter((member) => member.roles.cache.size === 1 && member.roles.cache.first().id === guild.id).forEach((member) => member.roles.add(UnregisterRoles));

                members = members.filter((member) => !member.user.bot && !member.hasPermission("ADMINISTRATOR") && ![BannedTagsRole, ...UnregisterRoles, require("../global.json").Permissions.Suspect.Role].some((role) => member.roles.cache.has(role)));


                members.filter((member) => member.roles.cache.size !== 1 && member.roles.cache.first().id !== guild.id && member.user.username.includes(Tag)).forEach((member) => {
                    if (!member.roles.cache.has(TeamRole)) member.roles.add(TeamRole).catch(console.error);
                   if (member.displayName.includes("|")) member.setNickname(member.displayName.replace(SecondTag, Tag)).catch(console.error);
                });

                members.filter((member) => !member.user.username.includes(Tag) && !member.roles.cache.has(BoosterRole) && !member.roles.cache.has(TeamRole) && !member.roles.cache.has(VIP)).forEach((member) => {
                    if (member.displayName.includes(Tag)) member.setNickname(member.displayName.replace(Tag, SecondTag)).catch(console.error);
                    if (TagIntakeMode === false) member.roles.remove(member.roles.cache.filter((rol) => rol.position >= guild.roles.cache.get(TeamRole).position)).catch(console.error);
                   else setRoles(member, UnregisterRoles);
                });
            });
    }, 5000);
});

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  };

Audit.on("message", async(message) => {
    if (!message.guild || message.author.bot) return;
    if (!message.member.hasPermission("ADMINISTRATOR")) await messageAudit(message);

    if (!message.content.startsWith(Prefix) && message.content.length > 5) return;
    

    if (!CooldownXP.has(message.author.id)) {
        const UserData = await LevelModel.findOne({ Id: message.author.id }).exec();
        if (!UserData) (new LevelModel({ Id: message.author.id })).save();
        else {        
            UserData.CurrentXP += Number(Math.floor(Math.random() * (25 - 15 + 1)) + 15);
    
            if (UserData.CurrentXP >= UserData.RequiredXP) {
                UserData.Level += 1;
                UserData.RequiredXP = 5 * (Math.pow(UserData.Level, 2)) + 50 * UserData.Level + 100;
                UserData.CurrentXP = +Number(UserData.RequiredXP - UserData.CurrentXP);

                let Guild = Audit.channels.cache.get(ServerID) || Audit.guilds.cache.first();
                let Member = Guild.member(message.author.id);
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
                            Point: Number((UserData.Level+1) * 50),
                            RequiredPoint: doc.RequiredPoint,
                            Tier: doc.Tier,
                            Max: state
                        }).save();
                    } else {
                        PointModel.updateOne({ Id: message.author.id }, { $inc: { Point: 50 } }).exec();
                    };
                });

            }
            await UserData.save();

            CooldownXP.add(message.author.id);
            setTimeout(() => {
                CooldownXP.delete(message.author.id);
            }, 60000);
        }
    }

    let Guild = Audit.channels.cache.get(ServerID) || Audit.guilds.cache.first();
    let Member = Guild.member(message.author.id);
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
                Point: 1,
                RequiredPoint: doc.RequiredPoint,
                Tier: doc.Tier,
                Max: state
            }).save();
        } else {
            PointModel.updateOne({ Id: message.author.id }, { $inc: { Point: 1 } }).exec();
        };
    });

    StatsModel.findOne({ Id: message.member.id }, (err, data) => {
        if (err) return console.error(err);

        if (!data) {
          let voiceMap = new Map();
          let chatMap = new Map();
          chatMap.set((message.channel.parentID || message.channel.id), 1);
          let newMember = new StatsModel({
            Id: message.member.id,
            Voice: voiceMap,
            TotalVoice: 0,
            Message: chatMap,
            TotalMessage: 1
          });
          newMember.save();
        } else {
            let onceki = data.Message.get((message.channel.parentID || message.channel.id)) || 0;
            data.Message.set((message.channel.parentID || message.channel.id), Number(onceki)+1);
            addMessageStat(message.author.id, 1);
            data.TotalMessage++;
            data.save();
        };
    })
});

async function addMessageStat(id, value) {
    TaskModel.updateMany({"Members.Id": id, "Activity": true, "FinishTime": {$gte: Date.now()}}, {$inc: {"Members.Message": value}}).exec((err, res) => {
      if(err) console.error(err);
  });
};



function setRoles(member, params) {
    if (!member.manageable) return false;
    let roles = member.roles.cache.filter((role) => role.managed).map((role) => role.id).concat(params);
    member.roles.set(roles).catch(console.error);
    return true;
}



Audit.login(AuditBotToken).then(() => console.log(`[AUDIT] ${Audit.user.username} is connected!`)).catch(() => console.error("[AUDIT] Bot is not connect!"));
