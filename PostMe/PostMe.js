	
	Posts = new Mongo.Collection("posts");
	

	if (Meteor.isClient) 
	{
		angular.module('PostMe',['angular-meteor']);

		angular.module("PostMe").controller("postsController", ['$scope', '$meteor',
		function($scope, $meteor)
		{
			$scope.posts = $meteor.collection(Posts);

		}]);
	}
		
	if (Meteor.isServer) 
	{ 	
		Meteor.startup(function()
		{
			var posts = [
				{
					'name' : "I`m in Bucharest",
					'picture' : "Insert Picture",
					'location': "get location"
				},
				{
					'name' : "I`m in Paris",
					'picture' : "Insert Picture",
					'location': "get location"
				},
				{
					'name' : "I`m in London",
					'picture' : "Insert Picture",
					'location': "get location"
				}
			];	
			
			for(var i=0; i< posts.length; i++)
			{
				Posts.insert({name: posts[i].name, camera: posts[i].camera, location: posts[i].location});
			}
		})
		
		
	}