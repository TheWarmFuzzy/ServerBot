//var config = require("./config.json"),
	//ServerBot = require("./ServerBot.js"),
var Discord = require("discord.js");
var ServerBot = require("./ServerBot.js");

var ServerBot = new ServerBot();
var client = new Discord.Client();

client.on("ready", function()
{
	console.log("Lets get serving!");
});

client.on("message", function (message)
{
	ServerBot.read_message(message)
	/*if(message.content === "ping")
	{
		if(message.member.user.username == "Blackenedtitan"){
			message.reply(message.member.user.username);
		}else{
			message.reply("Who are you?");
		}
		
	}*/
});

client.login("MjcxMDM2NTE0NjUyMTI3MjMy.C2AmmA.LKhkfNc7T10wB1UrK_RtQFi3Wkw")
	

	
//Heroku fix
//Binds to given port so it thinks it has started up correctly
var a = require('http');a.createServer(function (b, c) {}).listen(process.env.PORT);