const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const { Client, Util } = require('discord.js');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");
const queue = new Map();
const client = new Discord.Client();

/*
البكجآت
npm install discord.js
npm install ytdl-core
npm install get-youtube-id
npm install youtube-info
npm install simple-youtube-api
npm install queue
*/

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`in ${client.guilds.size} servers `)
    console.log(`${client.users.size}`)
});
var servers = [];
var queue = [];
var guilds = [];
var queueNames = [];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];
var now_playing = [];
/*
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
*/
client.on('ready', () => {});
var download = function(uri, filename, callback) {
	request.head(uri, function(err, res, body) {
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

client.on('message', function(message) {
	const member = message.member;
	const mess = message.content.toLowerCase();
	const args = message.content.split(' ').slice(1).join(' ');

	if (mess.startsWith(prefix + 'play')) {
	  
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		// if user is not insert the URL or song title
		if (args.length == 0) {
		
		
			
                message.channel.send('**قم. بإدراج رابط او اسم الأغنيه**').then(m => m.delete(5000)); 



return;
		}
		if (queue.length > 0 || isPlaying) {
			getID(args, function(id) {
				add_to_queue(id);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
				const checked = client.emojis.find("name", "checked");
			
						message.channel.send('' + checked + ' Enqueued `' + videoInfo.title +'`')
						
					queueNames.push(videoInfo.title);
					now_playing.push(videoInfo.title);

				});
			});
		}
		else {

			isPlaying = true;
			getID(args, function(id) {
				queue.push('placeholder');
				playMusic(id, message);
				fetchVideoInfo(id, function(err, videoInfo) {
					if (err) throw new Error(err);
				    const ayy = client.emojis.find("name", "320");
						
					message.channel.send(''+ ayy +' Now playing `'+ videoInfo.title +'` ')
					
					
							
					// .setDescription('?')
			
					
					// client.user.setGame(videoInfo.title,'https://www.twitch.tv/Abdulmohsen');
				});
			});
		}
	}
	else if (mess.startsWith(prefix + 'skip')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		const skip = client.emojis.find("name", "skip");
		message.channel.send(''+ skip +' skipped').then(() => {
			skip_song(message);
			var server = server = servers[message.guild.id];
			if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
		});
	}
	else if (message.content.startsWith(prefix + 'vol')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		// console.log(args)
		if (args > 100) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
		if (args < 1) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')
		dispatcher.setVolume(1 * args / 50);
		message.channel.sendMessage(`:loud_sound: set the volume to ${dispatcher.volume*50}%`);
	}
	else if (mess.startsWith(prefix + 'stop')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
			  const stop3 = client.emojis.find("name", "stop3");
		message.channel.send(''+ stop3 +' stopped').then(() => {
			dispatcher.pause();
		});
	}
	else if (mess.startsWith(prefix + 'go')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		const success = client.emojis.find("name", "success");
			message.channel.send(''+ success +' Ready to play audio in `' + voiceChannel.name + '`').then(() => {
			dispatcher.resume();
		});
	}
	else if (mess.startsWith(prefix + 'leave')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.channel.send('');
		var server = server = servers[message.guild.id];
		if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
	}
	else if (mess.startsWith(prefix + 'come')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		message.member.voiceChannel.join().then(message.channel.send(''));
	}
	else if (mess.startsWith(prefix + 'play')) {
		if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
		if (isPlaying == false) return message.channel.send(':anger: || **__تم التوقيف__**');
        	const checked = client.emojis.find("name", "checked");
			
			
			
			message.channel.send(''+ checked +' Enqueued `'+ videoInfo.title +'`')
			
			
		
			
		//.setDescription('?')
	
	}
});

function skip_song(message) {
	if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');
	dispatcher.end();
}

function playMusic(id, message) {
	voiceChannel = message.member.voiceChannel;


	voiceChannel.join().then(function(connectoin) {
		let stream = ytdl('https://www.youtube.com/watch?v=' + id, {
			filter: 'audioonly'
		});
		skipReq = 0;
		skippers = [];

		dispatcher = connectoin.playStream(stream);
		dispatcher.on('end', function() {
			skipReq = 0;
			skippers = [];
			queue.shift();
			queueNames.shift();
			if (queue.length === 0) {
				queue = [];
				queueNames = [];
				isPlaying = false;
			}
			else {
				setTimeout(function() {
					playMusic(queue[0], message);
				}, 500);
			}
		});
	});
}

function getID(str, cb) {
	if (isYoutube(str)) {
		cb(getYoutubeID(str));
	}
	else {
		search_video(str, function(id) {
			cb(id);
		});
	}
}

function add_to_queue(strID) {
	if (isYoutube(strID)) {
		queue.push(getYoutubeID(strID));
	}
	else {
		queue.push(strID);
	}
}

function search_video(query, cb) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
		var json = JSON.parse(body);
		cb(json.items[0].id.videoId);
	});
}


function isYoutube(str) {
	return str.toLowerCase().indexOf('youtube.com') > -1;
}
 client.on('message', message => {
     if (message.content === prefix +"help") {
    const embed = new Discord.RichEmbed()
     .setColor("RANDOM")
     .addField(`**__أوامر البوت__**`,`
	 **${prefix}play**
	 امر تشغيل الأغنية , !شغل الرابط او اسم الأعنية
	 **${prefix}skip**
	 تغير الأغنية
	 **${prefix}stop**
	 ايقاف الأغنية
	 **${prefix}go**
     مواصلة الأغنية
	 **${prefix}vol**
	 مستوى الصوت 1-100
	 **${prefix}leave**
	 خروج البوت من الروم`)

      message.channel.send({embed});
	 }
	});

client.login(process.env.TOKEN);
