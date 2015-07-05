
		angular.module("PostMe").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
		  function($urlRouterProvider, $stateProvider, $locationProvider)
		  {
				$locationProvider.html5Mode(true);

				$stateProvider			
				.state('pgroups', 
				{
					url: '/postsGroups',
					templateUrl: 'client/postMe/views/PostGroup.ng.html',
					controller: 'postsGroupsController'
				})
				.state('posts', 
				{
					url: '/postsGroups/:postGroupID',
					templateUrl: 'client/postMe/views/PostMe.ng.html',
					controller: 'postsController'
				})
				.state('postgroupsNoUser', 
				{
					url: '/postsGroups/nouser',
					templateUrl: 'client/postMe/views/NoUser.ng.html',
					controller: 'postsController' // NU MERGEEEE 
				});
				
				
				$urlRouterProvider.otherwise("/postsGroups");
			}]);