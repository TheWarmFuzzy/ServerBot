const cfg = require("../config.json");
const data = require("../configs/Music.json");
const ytdl = require("ytdl-core");

var MusicModule = function(){
	this.channel;
	this.voice_connection;
};

MusicModule.prototype.message = function(commands, msg, parent)
{
	if("!doom" == commands[0])
	{
		this.play("doom");
	}
	
	if("!kick" == commands[0])
	{
		if("undefined" != typeof this.voice_connection)
			this.reset();
	}
	
	if("!play" == commands[0])
	{
		var song;
		
		if(2 <= commands.length){
			song = commands[1];
			for (var i = 2; i < commands.length; i++){
				song += " " + commands[i];
			}
		}
		
		this.play(song);
	}
	
	if("!summon" == commands[0])
	{
		this.join_channel(msg.member.voiceChannel, this.set_voice_connection, this.reset);
	}
	
}

MusicModule.prototype.join_channel = function(channel, success, failure)
{
	if("undefined" == typeof channel)
		return false;
	
	var self = this;
	this.channel = channel;
	channel.join().then(function(conn){success(self, conn)}).catch(failure());	
}

MusicModule.prototype.set_voice_connection = function(self, connection)
{
	self.voice_connection = connection;
}


MusicModule.prototype.play = function(song)
{
	if("undefined" == typeof this.voice_connection)
		return false;
	
	var song_info = this.search(song);
	
	if("undefined" == typeof song_info)
		return false;
	
	this.start_stream(song_info);
}

MusicModule.prototype.search = function(song)
{
	if("undefined" == song)
	{
		//PLAY RANDOM MUSIC HERE
	}
	
	if("undefined" != typeof data.audio[song])
		return data.audio[song]
	
	return;
}

MusicModule.prototype.start_stream = function(song_info)
{
	var stream = ytdl(song_info.url, {filter:"audioonly"});
	var dispatch = this.voice_connection.playStream(stream,song_info.stream_options);
}


MusicModule.prototype.reset = function()
{
	if("undefined" != typeof this.voice_connection)
	{
		this.voice_connection.disconnect();
		this.channel = undefined;
	}
		
	if("undefined" != typeof this.channel)
	{
		this.channel.leave();
		this.channel = undefined;
	}
	
	
}

module.exports = MusicModule;