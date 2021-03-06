Feature('Csportal');

Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email2,testusers.password);
})

Scenario('Uk user can only select uk market', (I) => {
	I.seeCurrentUrlEquals('http://csportalstaging.cloudapp.net/CampaignManagement/Index?manufacturerId=06ca3fdf-39dc-48bb-a9eb-8632e020ee2e');
	I.wait(1);
	I.seeElement({xpath: '//*[@id="campaignCreator"]'});
	I.click({xpath: '//*[@id="campaignCreator"]'});
	I.wait(1);
	I.seeElement({xpath: '//*[@id="market"]'});
	I.selectOption('//*[@id="market"]', 'UK');

});