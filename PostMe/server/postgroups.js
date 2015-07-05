
	Meteor.publish("postGroups", function () 
	{
		return PostGroups.find(
		{
			$or:
			[
				{$and:
				[
					{"public": true},
					{"public": {$exists: true}}
				]},
				{$and:
				[
					{owner: this.userId},
					{owner: {$exists: true}}
				]}
			]
		});
	});
	
	Meteor.publish("posts", function () 
	{
		return Posts.find({});
	});