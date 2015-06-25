	
	Posts = new Mongo.Collection("posts");
	

	if (Meteor.isClient) 
	{
		angular.module('PostMe',['angular-meteor', 'ui.router']);
		
		angular.module("PostMe").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
		  function($urlRouterProvider, $stateProvider, $locationProvider)
		  {
				$locationProvider.html5Mode(true);

				$stateProvider
				
				.state('posts', 
				{
					url: '/posts',
					templateUrl: 'PostMe.ng.html',
					controller: 'postsController'
				});
				
				$urlRouterProvider.otherwise("/posts");
			}]);
		
		angular.module("PostMe").controller("postsController", ['$scope', '$meteor',
			function($scope, $meteor)
			{
				$scope.posts = $meteor.collection(Posts);
				
				$scope.addPost = function(new_post)
				{
					//Make sure the user is Logged in before inserting a Tasks
					// if (!Meteor.userId())
					// {
						// throw new Meteor.Error("not-authorized");
					// }
				
					Posts.insert(
					{
						name:new_post.name,
						selfie:new_post.selfie,
						location:new_post.location,
						createdAt: new Date(),
						// owner: Meteor.userId(),
						// username: Meteor.user().username
					});
				},
				
				$scope.remove = function(post)
				{
					$scope.posts.remove(post);
				};
				
				$scope.addSelfie = function(newPostSelfie)
				{
					$scope.newPost.selfie = 'selfie nou';
				};
				
				$scope.addLocation = function(newPostLocation)
				{
					$scope.newPost.location = 'location nou';
				};
				
				//function that removes all posts from that user -which is logged in

			}]);
	
	}
	

	if (Meteor.isServer) 
	{ 	
		Meteor.startup(function()
		{
			//
		})
	}