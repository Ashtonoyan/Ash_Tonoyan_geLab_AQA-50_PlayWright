// Generated from: tests\features\mailfence.feature
import { test } from "../../../src/core/fixtures/bdd-fixture.ts";

test.describe('Mailfence e2e test', () => {

  test('Send and process email', async ({ Given, When, And, Then }) => { 
    await Given('Login to mailfence'); 
    await When('Navigate to the Messages page'); 
    await And('Compose new email with file attachment name "AT_C2256"'); 
    await And('Send email to yourself'); 
    await And('Navigate to Email list'); 
    await And('Open the received email'); 
    await And('Move attached file to My Documents'); 
    await And('Navigate to the My Documents page'); 
    await And('Move txt file to Trash by drag and drop'); 
    await Then('Verify that txt file is in the Trash'); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('tests\\features\\mailfence.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":3,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":4,"keywordType":"Context","textWithKeyword":"Given Login to mailfence","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":5,"keywordType":"Action","textWithKeyword":"When Navigate to the Messages page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"And Compose new email with file attachment name \"AT_C2256\"","stepMatchArguments":[{"group":{"start":44,"value":"\"AT_C2256\"","children":[{"start":45,"value":"AT_C2256","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And Send email to yourself","stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":8,"keywordType":"Action","textWithKeyword":"And Navigate to Email list","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"And Open the received email","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And Move attached file to My Documents","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And Navigate to the My Documents page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And Move txt file to Trash by drag and drop","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then Verify that txt file is in the Trash","stepMatchArguments":[]}]},
]; // bdd-data-end