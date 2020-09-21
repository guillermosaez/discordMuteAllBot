const Discord = require('discord.js');
const client = new Discord.Client();

const muteUsers = function(message) {
    if (!setMuteToUsers(message, true)) {
        return;
    }
    sendMessageToChat(message.channel, 'All users muted');
};

const unmuteUsers = function(message) {
    if (!setMuteToUsers(message, false)) {
        return;
    }
    sendMessageToChat(message.channel, 'All users can speak');
};
const messageCallbacks = {
    'SHH': muteUsers,
    'SPEAK': unmuteUsers
};

client.on('message', message => {
    manageMessage(message);
});

function manageMessage(message) {
    var command = messageCallbacks[message.content.toUpperCase()];
    if (!command) {
        return;
    }
    command(message);
};

function setMuteToUsers(message, mute) {
    let voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        sendMessageToChat(message.channel, 'You have to be in a voice channel to use this command');
        return false;
    }
    for (let member of voiceChannel.members) {
        member[1].voice.setMute(mute);
    }
    return true;
};

function sendMessageToChat(channel, message) {
    if (!channel) {
        return;
    }
    channel.send(message);
}

client.login(process.env.BOT_TOKEN);