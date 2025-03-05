// Generated from: tests\features\mailfence.feature
import { test } from "playwright-bdd";

test.describe('Mailfence e2e test', () => {

  test('Send and process email', async ({ Given, When, And, Then }) => { 
    await Given('I am logging into the site using an existing account'); 
    await When('I navigate to the Messages page'); 
    await And('I create new message with prexif AT_C2256_, fill file with prefix file_AT_C2256_'); 
    await And('I send to myself'); 
    await And('I navigate to Email list'); 
    await And('I refresh Email list'); 
    await Then('I should see the sent email in my inbox'); 
    await And('I open new email and save the file from the message to the "My Documents" folder'); 
    await And('I navigate to the My Documents page'); 
    await And('I refresh Document lists'); 
    await And('I move the file to the Trash folder.'); 
    await And('I go to Trash folder'); 
    await Then('I should see the file with prefix file_AT_C2256_ in folder'); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('tests\\features\\mailfence.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given I am logging into the site using an existing account","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When I navigate to the Messages page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And I create new message with prexif AT_C2256_, fill file with prefix file_AT_C2256_","stepMatchArguments":[{"group":{"start":33,"value":"AT_C2256_","children":[]}},{"group":{"start":66,"value":"file_AT_C2256_","children":[]}}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And I send to myself","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And I navigate to Email list","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And I refresh Email list","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see the sent email in my inbox","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And I open new email and save the file from the message to the \"My Documents\" folder","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And I navigate to the My Documents page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And I refresh Document lists","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And I move the file to the Trash folder.","stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And I go to Trash folder","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then I should see the file with prefix file_AT_C2256_ in folder","stepMatchArguments":[{"group":{"start":34,"value":"file_AT_C2256_","children":[]}}]}]},
]; // bdd-data-end