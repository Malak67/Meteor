// Controller for Post Groups
		angular.module("PostMe").controller("postsGroupsController", ['$scope', '$meteor',
			function($scope, $meteor)
			{
				$scope.postGroups = $meteor.collection(PostGroups).subscribe('postGroups');

				$scope.GroupTypes = [
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
					PostGroups.insert(
					{
						name:postGroup.name,
						type:postGroup.type,
						public:postGroup.public,
						createdAt: new Date(),
						owner: postGroup.owner,
						// username: Meteor.user().username
					});
				}
			}]);