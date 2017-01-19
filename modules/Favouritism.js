var cfg = require("../config.json");
var data = require("../configs/Favouritism.json");
var FavouritismModule = function(){};

FavouritismModule.prototype.message = function(commands, msg)
{
	var user = msg.member.user.username.toLowerCase();
	var favouritism = 50;
	
	if("undefined" != typeof data.users[user])
		favouritism = data.users[user];

	var rn_agree =  Math.floor(Math.random() * 100);
	
	//Check if the bot agrees with you
	if(favouritism > rn_agree)
	{
		//He agrees
		var rn_response =  Math.floor(Math.random() * data.positive_responses.length);
		msg.reply(data.positive_responses[rn_response]);
		
		//Log it!
		console.log("I like " + user + " more than I care: " + favouritism + " > " + rn_agree);
	}
	else
	{
		//He does not agree
		console.log("I care more than I like " + user + ": " + favouritism + " < " + rn_agree);
		var rn_response =  Math.floor(Math.random() * data.negative_responses.length);
		msg.reply(data.negative_responses[rn_response]);
	}
	
}

module.exports = FavouritismModule;