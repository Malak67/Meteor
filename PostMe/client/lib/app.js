	
	angular.module('PostMe',['angular-meteor', 'ui.router']);
	
	// This will enable login in without needing an email
	Accounts.ui.config(
	{
		passwordSignupFields: "USERNAME_ONLY"
	});

