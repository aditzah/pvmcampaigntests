Feature('Csportal');
// Initiate login
Before((I,testusers) => {
	I.amOnPage('http://csportalstaging.cloudapp.net/Account/Login?ReturnUrl=%2F');
	I.login(testusers.email2,testusers.password);
})

Scenario('Validate UK Campaign, multiple selections', function*(I) {
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
	I.selectOption('//*[@id="market"]', 'UK');
	I.wait(2);
	//Select Brand
	I.seeElement({xpath: '//*[@id="brand"]'});
	I.selectOption('//*[@id="brand"]', 'Mentos');
	I.wait(1);
	//Insert product code
	I.appendField('//*[@id="codesUrl"]', '8723400770305');
	I.waitForElement('//*[@id="retailersDiv"]/label/input');
	//Select retailer
	I.checkOption('//*[@id="retailersDiv"]/label/input','Tesco');
	//Select campaign name
	I.seeElement({xpath: '//*[@id="campaign"]'});
	I.selectOption('//*[@id="campaign"]', 'Test_content1');
	//Select Campaign Source (multiple - test will fail if you select more than 3)
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[9]/div/div'});
	I.click('//*[@id="campaignCreatorDiv"]/div[9]/div/div/ul/li[1]/a/label/input', 'Facebook');
	I.click('//*[@id="campaignCreatorDiv"]/div[9]/div/div/ul/li[3]/a/label/input', 'Instagram');
	I.click('//*[@id="campaignCreatorDiv"]/div[9]/div/div/ul/li[4]/a/label/input', 'YouTube');
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[9]/div/div'});
	//Select Campaign Medium (multiple)
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[11]/div/div/button'});
	I.click('//*[@id="campaignCreatorDiv"]/div[11]/div/div/ul/li[1]/a/label/input', 'Banner');
	I.click('//*[@id="campaignCreatorDiv"]/div[11]/div/div/ul/li[2]/a/label/input', 'Carousel');
	I.click('//*[@id="campaignCreatorDiv"]/div[11]/div/div/ul/li[5]/a/label/input', 'Video');
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[11]/div/div/button'});
	//Select Campaign Content (multiple)
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[13]/div/div/button'});
	I.click('//*[@id="campaignCreatorDiv"]/div[13]/div/div/ul/li[4]/a/label/input', 'Heritage');
	I.click('//*[@id="campaignCreatorDiv"]/div[13]/div/div/ul/li[7]/a/label/input', 'Rail');
	I.click('//*[@id="campaignCreatorDiv"]/div[13]/div/div/ul/li[9]/a/label/input', 'Test_content1');
	I.click({xpath: '//*[@id="campaignCreatorDiv"]/div[13]/div/div/button'});
	//complete Campaign Term
	I.appendField('//*[@id="term"]', 'testcontent');
	//Generate results
	I.click('//*[@id="generateResults"]');
	I.waitForElement('//*[@id="results"]/table/tbody/tr[1]/td[2]/div');
	I.seeElement('//*[@id="results"]/table/tbody/tr[1]/td[2]/div');

		//Grab product number from Product Code Field
	$productno = yield I.grabTextFrom('//*[@id="codesUrl"]');
	//Check product code shows in results and has the corect value
	I.see($productno, '//*[@id="results"]/table/tbody/tr[2]/td[1]/div');
	//Grab retailer value from selected retailers
	$retailer = yield I.grabTextFrom('//*[@id="retailersDiv"]/label/input');
	//check Retailer shows and has the correct value
	I.see($retailer, '//*[@id="results"]/table/tbody/tr[2]/td[2]/div');
	//Grab generated URL from results
	$url = yield I.grabTextFrom('//*[@id="results"]/table/tbody/tr[2]/td[3]/div');
	//grab campaign source contents
	$cs = yield I.grabTextFrom('//*[@id="campaignCreatorDiv"]/div[9]/div/div/button/span');
	//var csa = grab text from Campaign Source field, remove whitespaces;
	$csa = $cs.replace(/\s/g, '');
	//var csb turn csa into an array
	csb = $csa.split(",");
	//grab campaign mediums contents
	$cm = yield I.grabTextFrom('//*[@id="campaignCreatorDiv"]/div[11]/div/div/button/span');
	//grab text from campaign contents field, remove whitespace
	$cma = $cm.replace(/\s/g, '');
	//var cmb turn cma into an array
	cmb = $cma.split(",");
	//grab campaign content contents
	$cc = yield I.grabTextFrom('//*[@id="campaignCreatorDiv"]/div[13]/div/div/button/span');
	// grab text from capmapign contents field, remove whitespace
	$cca = $cc.replace(/\s/g, '');
	//var ccb turn cca into an array
	ccb = $cca.split(",");
	//grab campaign term
	$ct = yield I.grabTextFrom('//*[@id="term"]');
	//check if generated url shows in results
	I.see($url, '//*[@id="results"]/table/tbody');
	//check if campaign source contents show in results
	for (a in csb) {
		I.see(csb[a], '//*[@id="results"]/table/tbody');
	}
	//check if campaign mediums show in results
	for (a in cmb) {
		I.see(cmb[a], '//*[@id="results"]/table/tbody');
	}
	//check if campaign content show in results
	for (a in ccb) {
		I.see(ccb[a], '//*[@id="results"]/table/tbody');
	}
	//check if campaign terms show in results
	I.see($ct, '//*[@id="results"]/table/tbody');
	//Export results to CSV
	//I.click('//*[@id="exportResultsBtn"]');
	I.wait(2);

	//Export results to CSV
	//I.click('//*[@id="exportResultsBtn"]');
	//I.wait(2);

});