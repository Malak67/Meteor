	// Create a new Database in Mongo called tasks
	Tasks = new Mongo.Collection("tasks");

	if (Meteor.isClient) 
	{
		
		Meteor.subscribe("tasks");
		
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
			
				Meteor.call("addTask", text);
				
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
				Meteor.call("setChecked", this._id, ! this.checked);
			},
			
			"click .delete": function()
			{
				Meteor.call("deleteTask", this._id);
			},
			
			"click .toggle-private": function()
			{
				Meteor.call("setPrivate", this._id, ! this.private);
			}
		});
		
		Template.task.helpers(
		{
			isOwner: function () 
			{
				return this.owner === Meteor.userId();
			}
		});

		// This will enable login in without needing an email
		Accounts.ui.config(
		{
			passwordSignupFields: "USERNAME_ONLY"
		});
		
		
	}
	
	Meteor.methods(
	{
		addTask: function(text)
		{
			//Make sure the user is Logged in before inserting a Tasks
			if (!Meteor.userId())
			{
				throw new Meteor.Error("not-authorized");
			}
		
			Tasks.insert(
			{
				text:text,
				createdAt: new Date(),
				owner: Meteor.userId(),
				username: Meteor.user().username
			});
		},	
		
		deleteTask: function(taskId)
		{
			var task = Tasks.findOne(taskId);
			
			if(task.private && task.owner !== Meteor.userId())
			{
				throw new Meteor.Error("not-authorized");
			}
			
			
			Tasks.remove(taskId);
		},
		
		setChecked: function (taskId, setChecked)
		{
			var task = Tasks.findOne(taskId);
			
			if(task.private && task.owner !== MeteorUserId())
			{
				throw new Meteor.Error("not-authorized");
			}
			
			Tasks.update(taskId, {$set: {checked: setChecked}});
		},
		
		setPrivate: function(taskId, setToPrivate)
		{
			var task = Tasks.findOne(taskId);
			
			if(task.owner !== Meteor.userId())
			{
				throw new Meteor.Error("not authorized");
			}
			
			Tasks.update(taskId, {$set: {private: setToPrivate}});
		}
	});
	
	if (Meteor.isServer) 
	{
		Meteor.publish("tasks", function()
		{
			return Tasks.find(
			{
				$or: [
					{ private: {$ne: true} },
					{ owner: this.userId }
				]
			});
		});
	}
