// Set up vars
let runner;
let scope;
const baseConfig = {
    "reporter": "list",
    "recursive": true,
    "file": [
        "test/setup.ts"
    ],
    "spec": []
}

// Pull out args if present
const argv = process.argv;
argv.forEach(arg => {
    const split = arg.split(":")
    switch (split[0]) {
        case "--runner":
            runner = split[1];
            break;
        case "--scope":
            scope = split[1];
            break;
        default:
            break;
    }
})

// Set scope of tests
scope = scope || "unit";
if (scope == "coverage") {
    baseConfig.spec.push(`test/unit/**/*.spec.ts`);
} else {
    baseConfig.spec.push(`test/${scope}/**/*.spec.ts`);
}

// Add junit options if being run by CI/CD
if (runner == "cicd") {
    baseConfig.reporter = "mocha-junit-reporter";
    baseConfig.reporterOptions = {
        "mochaFile": `./junit_report-${scope}.xml`
    };
}

// Export Config
module.exports = baseConfig;