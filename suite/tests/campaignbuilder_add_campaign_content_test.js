

Feature('Csportal');
// Initiate login
Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email3,testusers.password);
})

Scenario('Admin Add/Edit/Remove Campaign Content', function*(I) {
	//After login, check I'm on the homepage
	I.wait(1);
	I.seeCurrentUrlEquals('http://csportalstaging.cloudapp.net/CampaignManagement/Index?manufacturerId=06ca3fdf-39dc-48bb-a9eb-8632e020ee2e');
	I.wait(1);
	I.click('//*[@id="manageContents"]');
	I.click('//*[@id="addNewContent"]');
	I.appendField('//*[@id="nameField"]', 'TestContentAutomated');
	I.appendField('//*[@id="descriptionField"]','TestDescriptionAutomated');
	I.click('//*[@id="saveOrUpdate"]');
	//check if medium is appended into the correct row before editing or deleting; if not, delete manually and modify test
	I.see('TestContentAutomated', '//*[@id="contents-grid"]/tbody/tr[10]');
	I.see('TestDescriptionAutomated', '//*[@id="contents-grid"]/tbody/tr[10]');
	I.click('//*[@id="contents-grid"]/tbody/tr[10]/td[3]/button[1]');
	I.appendField('//*[@id="nameField"]','1');
	I.appendField('//*[@id="descriptionField"]', '1');
	I.click('//*[@id="saveOrUpdate"]');
	I.click('//*[@id="contents-grid"]/tbody/tr[10]/td[3]/button[2]');
	I.click('//*[@id="deleteItem"]');
	I.dontSee('TestContentAutomated', '//*[@id="contents-grid"]');
    


});