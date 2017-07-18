Feature('Csportal');
// Initiate login
Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email1,testusers.password);
})
Scenario('Check error messages', function*(I) {
	//After login, check I'm on the homepage
	I.wait(1);
	I.seeCurrentUrlEquals('http://csportalstaging.cloudapp.net/CampaignManagement/Index?manufacturerId=06ca3fdf-39dc-48bb-a9eb-8632e020ee2e');
	I.wait(1);
	//click on Campaign Creator
	I.seeElement({xpath: '//*[@id="campaignCreator"]'});
	I.click({xpath: '//*[@id="campaignCreator"]'});
	I.wait(1);
	//Select market
	I.seeElement({xpath: '//*[@id="market"]'});
	I.selectOption('//*[@id="market"]', 'US');
	I.wait(2);
	I.click('//*[@id="generateResults"]');
	I.see('The Brand field is required', '//*[@id="campaignCreatorDiv"]/div[3]/span');
	I.see('The Campaign Name field is required', '//*[@id="campaignCreatorDiv"]/div[8]/span');
	I.see('The Campaign Source field is required', '//*[@id="campaignCreatorDiv"]/div[10]/span');
	I.see('The Campaign Medium field is required', '//*[@id="campaignCreatorDiv"]/div[12]/span');
	I.see('The Campaign Content field is required', '//*[@id="campaignCreatorDiv"]/div[14]/span');
});