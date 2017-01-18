var config = require("./config.json");
var appinfo = require("./package.json");

var ServerBot = function ()
{
	//Log it!
	console.log("Starting ServerBot v" + appinfo.version);

	this.modules = this.load_modules();
};

ServerBot.prototype.load_modules = function()
{
	var modules = {};
	for (var i in config.modules)
	{
		var loaded_mod = this.load_module(config.modules[i]);
		
		if("undefined" != typeof loaded_mod.module)
		{
			modules[config.modules[i].mod] = loaded_mod;
			console.log("\t" + "running...");
		}

	}
	
	return modules;
}

ServerBot.prototype.load_module = function(mod_info)
{
	var module;
	try
	{
		module = {};
		var mod_code = require("./modules/" + mod_info.url);
		module["module"] = new mod_code;
		module["keywords"] = mod_info.keywords;
		
		//Log it!
		console.log("Module loaded - " + mod_info.name + " v" + mod_info.version);
	}
	catch(e)
	{
		console.error("Module failed - " + mod_info.name + " v" + mod_info.version);
		console.error("\t" + e.message);
	}
	
	return module;
}

ServerBot.prototype.get_loaded_modules = function()
{
	var mod_list = [];
	for(var i in this.modules)
	{
		mod_list.push(i);
	}
	return mod_list;
}

ServerBot.prototype.read_message = function(msg)
{
	//Don't respond to itself
	if (msg.member.user.username == "serverbot")
		return false;
	
	//Make sure there are modules loaded
	if(typeof this.modules == "undefined" || this.modules.length <= 0)
		return false;

	var message = msg.content;
	
	//Loop through the modules
	for (var module in this.modules)
	{
		//Make sure the module has keywords
		if(typeof this.modules[module].keywords == "undefined" || this.modules[module].keywords.length <= 0)
			continue;
		
		var keywords = this.modules[module].keywords;
		
		for(var i = 0; i < keywords.length; i++)
		{
			var keyword = keywords[i];
			
			//If the keyword is in the string
			if(message.toLowerCase().indexOf(keyword) >= 0)
			{
				this.run_function(module, keyword, msg);
			}
		}
	}
	
	return true;
}

ServerBot.prototype.run_function = function(func, keyword, msg)
{
	var mod = this.modules[func]["module"],
		data = this.modules[func]["data"];
		
	mod.message(keyword, msg, this);
}

module.exports = ServerBot;
