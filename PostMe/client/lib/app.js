	
	angular.module('PostMe',
	[
		'angular-meteor', 
		'ui.router',
//		'angularUtils.directives.dirPagination',
		'uiGmapgoogle-maps'
	]);
	
	// This will enable login in without needing an email
	Accounts.ui.config(
	{
		passwordSignupFields: "USERNAME_ONLY"
	});

	  sAlert.config({
        effect: 'genie',
        position: 'bottom',
        timeout: 1500,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0
    });
