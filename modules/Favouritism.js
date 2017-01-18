var cfg = require("../config.json");
var FavouritismModule = function(){};

FavouritismModule.prototype.message = function(keyword, msg, data)
{
	//Respond to positive users
	for (var user in data.positive_users)
	{
		if (msg.member.user.username.toLowerCase() == data.positive_users[user].toLowerCase())
		{
			var rn =  Math.floor(Math.random() * data.positive_responses.length);
			msg.reply(data.positive_responses[rn]);
		}	
	}
	
	
	//Respond to negative users
	for (var user in data.negative_users)
	{
		if (msg.member.user.username.toLowerCase() == data.negative_users[user].toLowerCase())
		{
			var rn =  Math.floor(Math.random() * data.negative_responses.length);
			msg.reply(data.negative_responses[rn]);
		}	
	}
	
	console.log("Played favourites.");
	
}

module.exports = FavouritismModule;