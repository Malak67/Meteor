// Controller for Post Groups
		angular.module("PostMe").controller("postsGroupsController", ['$scope', '$meteor',
			function($scope, $meteor)
			{
				$scope.postGroups = $meteor.collection(PostGroups).subscribe('postGroups');
			//	$scope.updatePostGroup = false;
			//	console.log($scope.updatePostGroup);
			
				$scope.GroupTypes = 
				[
					{ id: 1, type: 'Music' },
					{ id: 2, type: 'Movies' },
					{ id: 3, type: 'Social' },
					{ id: 4, type: 'Entertainment' },
					{ id: 5, type: 'Sports' }
				];

				$scope.removePostGroup = function(postGroup)
				{
				   $scope.postGroups.remove(postGroup);
				};
				
				$scope.addPostGroup = function(postGroup)
				{
					console.log(postGroup);
					//	console.log(postGroup);
					if(!postGroup.name)
					{
						// HERE IS THE PROBLEM !!!!!!
						sAlert.error('Name missing!');
					//	document.getElementById("pgName").value = '';
					//	document.getElementById("postGroupForm").reset();
						
						// console.log(postGroup.name);
						// console.log(postGroup.type);
					}
					else
					{
						PostGroups.insert(
						{
							name:postGroup.name,
							type:postGroup.type,
							public:postGroup.public,
							createdAt: new Date(),
							owner: postGroup.owner,
							username: Meteor.user().username
						});
						sAlert.success('Post Group created!');
					}
				};
				
				$scope.editPostGroup = function(postGroupId)
				{
					$scope.updatePostGroup = true;
					$scope.editPostGroupId = postGroupId;
					console.log($scope.updatePostGroup);
				};
				
				$scope.UpdatePostGroup = function(postGroup, postGroupId)
				{
					console.log(postGroupId);
					if(!postGroup.name)
					{
						// Bootstrap error message
						// alert('Please enter a name for your Post Group');
						sAlert.error('Name missing!');
						console.log(postGroup.name);
					}
					else
					{
						PostGroups.update({ _id: postGroupId }, {$set: { name: postGroup.name, type : postGroup.type, public: postGroup.public} });
					//	$scope.updatePostGroup = false;
						sAlert.success('Post Group updated!');
					}
				}
				
			}]);