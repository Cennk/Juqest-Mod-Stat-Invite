const Moderation = global.Moderation;
const { VoiceChannelID, Status, ServerID } = Moderation.Defaults;

exports.execute = () => {
    const VoiceChannel = Moderation.channels.cache.get(VoiceChannelID);
    Moderation.guilds.cache.get(ServerID).channels.cache.get(VoiceChannelID).join().catch();
    Moderation.user.setPresence({
        activity: {
            name: Status,
            type: "WATCHING"
        }
    });
};

exports.conf = {
    event: "ready",
    enabled: true
};