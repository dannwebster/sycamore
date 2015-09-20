Template.adminSettings.helpers({
	'config': function(){
		return AppSettings.findOne();
	}
})

Template.adminSettings.events({
	'click .toggle_config': function(event){
		var setting = event.currentTarget.id
		var config = AppSettings.findOne();
		
		var jsonObj = {};
		
		var test = config[setting]
		
		if(config[setting]){
			jsonObj[setting] = false;
			AppSettings.update(config._id,{$set: jsonObj})
		}else{
			jsonObj[setting] = true;
			AppSettings.update(config._id,{$set: jsonObj})
		}
	
	}
})