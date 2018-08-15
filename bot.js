const Discord = require('discord.js');
const fs = require("fs")
const moment = require('moment');
const client = new Discord.Client();
const prefix = '#';


client.on('ready', function() {
	console.log(`i am ready ${client.user.username}`);
	client.user.setActivity('Weekend');



});



/*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/

client.on('message', message => {
    if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith(prefix + 'event123a')){
if(message.author.id !== '314677417954377730') return;
message.channel.sendMessage(`جار ارسال الرسالة |:white_check_mark: \n Message Has Been Sent For ${message.guild.members.size} Members`)
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});
    

client.login(process.env.TOKEN);
