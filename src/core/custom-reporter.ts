import {Reporter, FullConfig, FullResult, TestCase, TestResult, TestError, Suite} from "playwright/types/testReporter";

export default class CustomReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
        console.log("Test Execution Started")
        console.log(`Total testcase: ${suite.allTests().length}`)
    }

    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`Running test ${test.title}`)
    }

    onError(error: TestError) {
        console.log(`Test Error Detected!`);
        console.log(`Message: ${error.message}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished Test: ${test.title} - Status: ${result.status}`)
    }

    onEnd(result: FullResult) {
        console.log(`All tests results: ${result.status}`);
    }
}