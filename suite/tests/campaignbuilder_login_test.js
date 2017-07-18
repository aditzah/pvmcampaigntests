
Feature('Csportal');

Scenario('Login', (I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email4,testusers.password);

});
