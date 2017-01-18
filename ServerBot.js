var config = require("./config.json");
var appinfo = require("./package.json");

var ServerBot = function ()
{
	console.log("Starting ServerBot v" + appinfo.version);
	
	this.modules = this.load_modules();
};

ServerBot.prototype.load_modules = function()
{
	var modules = [];
	for (var i in config.modules)
	{
		modules.push(require("./modules/" + config.modules[i].url));
		
		console.log("Module loaded - " + config.modules[i].name + " v" + config.modules[i].version);
	}
}

ServerBot.prototype.read_message = function(message, triggers, callback)
{
	
}

module.exports = ServerBot;