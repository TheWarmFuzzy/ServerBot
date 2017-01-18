var cfg = require("../config.json");
var data = require("../configs/Help.json");
var HelpModule = function(){};

HelpModule.prototype.message = function(keyword, msg, parent)
{
	var loaded_modules = parent.get_loaded_modules();
	
	var reply = "Here are the modules currently installed: \n"
	
	//Loop through loaded mods
	for(var i in loaded_modules)
	{
		//Compare against all mods
		for(var j in cfg.modules)
		{
			
			if(loaded_modules[i] == cfg.modules[j].mod)
			{
				
				//Found the mod in the list
				reply += "\n";
				
				var module = cfg.modules[j];
				reply += "**" + module.name + " v" + module.version + "**" + "\n";
				reply += "\t" + "*" + module.description + "*" + "\n";
				
				if("undefined" != module["activation-type"])
					reply += "\t" + "**" + module["activation-type"] + ":**" + "\n";
				else
					reply += "\t" + "**Keywords and/or Phrases:**" + "\n";
				
				for(var k in module.keywords)
				{
					reply += "\t\t- " + module.keywords[k] + "\n";
				}
				
				break;
			}
		}
		
	}
	msg.reply(reply);
}

module.exports = HelpModule;