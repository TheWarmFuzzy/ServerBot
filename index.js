//var config = require("./config.json"),
	//ServerBot = require("./ServerBot.js"),
var Discord = require("discord.js");
	
//var sb = new ServerBot;
var client = new Discord.Client();

client.on("ready", function()
{
	console.log("Start!");
});

client.on("message", function (message)
{
	if(message.content === "ping")
	{
		message.reply("Hello?");
	}
});

client.login("MjcxMDM2NTE0NjUyMTI3MjMy.C2AmmA.LKhkfNc7T10wB1UrK_RtQFi3Wkw")
	