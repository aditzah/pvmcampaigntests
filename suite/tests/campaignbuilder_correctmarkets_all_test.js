Feature('Csportal');

Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email1,testusers.password);
})

Scenario('PVM user can select any market', (I) => {
	I.seeCurrentUrlEquals('http://csportalstaging.cloudapp.net/CampaignManagement/Index?manufacturerId=06ca3fdf-39dc-48bb-a9eb-8632e020ee2e');
	I.wait(1);
	I.seeElement({xpath: '//*[@id="campaignCreator"]'});
	I.click({xpath: '//*[@id="campaignCreator"]'});
	I.wait(1);
	I.seeElement({xpath: '//*[@id="market"]'});
	I.selectOption('//*[@id="market"]', 'CN');
	I.wait(1);
	I.selectOption('//*[@id="market"]', 'US');
	I.wait(1);
	I.selectOption('//*[@id="market"]', 'UK');

});