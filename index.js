var Config = require("./discord.json");
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
	ServerBot.read_message(message);
});

//Check if the token exists to log in
if("undefined" == typeof Config.discord.token){
	console.error("The discord token has not been provided.")
	console.error("Stopping ServerBot.")
	process.exit()
}
	
client.login(Config.discord.token)
