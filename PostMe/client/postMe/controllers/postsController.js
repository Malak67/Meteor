		// Controller for Posts
		angular.module("PostMe").controller("postsController", ['$scope', '$stateParams', '$meteor',
			function($scope, $stateParams, $meteor)
			{
				$scope.posts = $meteor.collection(Posts).subscribe('posts');
				
				$scope.postGroupID = $stateParams.postGroupID;
				
				// $scope.posts = $meteor.object(Posts, $stateParams.postGroupID); 
				// Sa implementez asa ca e mai elegant
								
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
						groupID: new_post.groupID,
						createdAt: new Date(),
						owner: new_post.owner,
						username: Meteor.user().username
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