	// Create a new Database in Mongo called tasks
	Tasks = new Mongo.Collection("tasks");

	if (Meteor.isClient) 
	{
		
		Template.body.helpers(
		{
			
			tasks: function()
			{
				if(Session.get("hideCompleted"))
				{
					return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
				}
				else
				{
					return Tasks.find({}, {sort: {createdAt: -1}});
				}
			},

			hideCompleted: function()
			{
				return Session.get("hideCompleted");
			},

			incompleteCount: function()
			{
				return Tasks.find({checked: {$ne: true}}).count();
			}
		});

 
		Template.body.events(
		{
			// This function is called when a new task form is submitted
			"submit .new-task": function (event)
			{
				var text = event.target.text.value;
			
				Tasks.insert(
				{
					text:text,
					createdAt: new Date(), 				// current time
					owner: Meteor.userId(), 			// _id of logged user
					username: Meteor.user().username 	// username of Logged in user
				});
				
				// Clear form
				event.target.text.value = "";
				
				// Prevent default form submit
				return false;
			},
			"change .hide-completed input": function (event)
			{
				Session.set("hideCompleted", event.target.checked);
			}
		});
		
		Template.task.events(
		{
			"click .toggle-checked": function()
			{
				Tasks.update(this._id, {$set:{checked: ! this.checked}});
			},
			
			"click .delete": function()
			{
				Tasks.remove(this._id);
			}
		});
		
		// This will enable login in without needing an email
		Accounts.ui.config(
		{
			passwordSignupFields: "USERNAME_ONLY"
		});
	
	}
	
	if (Meteor.isServer) {
	  Meteor.startup(function () {
		// code to run on server at startup
	  });
	}
