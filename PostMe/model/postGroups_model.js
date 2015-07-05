	
	// Create the Mongo DBs
	Posts = new Mongo.Collection("posts");
	PostGroups = new Mongo.Collection("postGroups");
	
	
	Posts.allow(
	{
		insert: function (userId, posts) 
		{
			return userId && posts.owner === userId;
		},
		update: function (userId, posts, fields, modifier) 
		{
			return userId && posts.owner === userId;
		},
		remove: function (userId, posts) 
		{
			return userId && posts.owner === userId;
		}
	});

	PostGroups.allow(
	{
		insert: function (userId, postGroups) 
		{
			return userId && postGroups.owner === userId;
		},
		update: function (userId, postGroups, fields, modifier) 
		{
			return userId && postGroups.owner === userId;
		},
		remove: function (userId, postGroups) 
		{
			return userId && postGroups.owner === userId;
		}
	});