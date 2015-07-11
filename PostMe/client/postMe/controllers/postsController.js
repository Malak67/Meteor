		// Controller for Posts
		angular.module("PostMe").controller("postsController", ['$scope', '$stateParams', '$meteor',
			function($scope, $stateParams, $meteor)
			{
				$scope.map = 
				{
					center: 
					{
						latitude: 45,
						longitude: -73
					},
					zoom: 8,
					events: {}
				};
				
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
					if(!new_post.name)
					{
						alert("Please add a name to your Post!")
					}
					else
					{
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
					}			
				},
				
				$scope.remove = function(post)
				{
					$scope.posts.remove(post);
				};
				
				$scope.addSelfie = function(newPostSelfie)
				{
					if(!$scope.newPost)
					{
						alert("Please select a name for your post!")
					}
					else
					{								
						var cameraOptions = 
						{
							width: 200,
							height: 200
						};
						
						MeteorCamera.getPicture(cameraOptions, function (error, data) 
						{
							if (!error) 
							{
								console.log(data);
								$scope.newPost.selfie = data; 
								//how to really insert it into the DB !!!!!!!!!!!!
							}
						});
						event.preventDefault();
					}
				};
				
				$scope.addLocation = function(newPostLocation)
				{		
					if(!$scope.newPost)
					{
						alert("Please select a name for your post!")
					}
					else
					{
						// Try HTML5 geolocation
						if(navigator.geolocation) 
						{
							$scope.newPost.location = $scope.map.center;
							navigator.geolocation.getCurrentPosition(function(position) 
							{
								var position =  new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
								$scope.newPost.location.latitude = position.A;
								$scope.newPost.location.longitude = position.F;
								console.log($scope.newPost.location);
								console.log(position);
								console.log('cur');
							});
						} 
						else 
						{
							// Browser doesn't support Geolocation
						}
					}
				}	
				//function that removes all posts from that user -which is logged in
			}]);