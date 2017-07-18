Feature('Csportal');
// Initiate login
Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email3,testusers.password);
})

Scenario('Admin Add/Edit/Remove Campaign Source', function*(I) {
	//After login, check I'm on the homepage
	I.wait(1);
	I.seeCurrentUrlEquals('http://csportalstaging.cloudapp.net/CampaignManagement/Index?manufacturerId=06ca3fdf-39dc-48bb-a9eb-8632e020ee2e');
	I.wait(1);
	I.click('//*[@id="manageSources"]');
	I.click('//*[@id="addNewChannel"]');
	I.appendField('//*[@id="nameField"]', 'TestSourceAutomated');
	I.appendField('//*[@id="descriptionField"]','TestDescriptionAutomated');
	I.click('//*[@id="saveOrUpdate"]');
	//check if source is appended into the correct row before editing or deleting; if not, delete manually and modify test
	I.see('TestSourceAutomated', '//*[@id="channels-grid"]/tbody/tr[4]');
	I.see('TestDescriptionAutomated', '//*[@id="channels-grid"]/tbody/tr[4]');
	I.click('//*[@id="channels-grid"]/tbody/tr[4]/td[3]/button[1]');
	I.appendField('//*[@id="nameField"]','1');
	I.appendField('//*[@id="descriptionField"]', '1');
	I.click('//*[@id="saveOrUpdate"]');
	I.click('//*[@id="channels-grid"]/tbody/tr[4]/td[3]/button[2]');
	I.click('//*[@id="deleteItem"]');
	I.dontSee('TestSourceAutomated', '//*[@id="channels-grid"]');

});