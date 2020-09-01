# Continuous Integration scripts for Allure Reporter
Script to automate use of Allure Reporter on continuous integration

## Setup

### Installation

This is a tool designed to be used as stand alone. The installation should be done by installing NPM dependencies under a clone of this repository:

```bash
npm install
```

## Usage

The goal of that tool is to recover all the reports generated from the Automated Test Cases to be used on allure reporer and saving it as PDFs format. 

> The accepted files are .xml and .json and with UUID format.

Giving the input folder as a generated Allure Reports and the output follder as a result pdf after using the Allure Reporter.

## Configuration

The configuration of the input and output folder is performed into the configuration folder inside the project where configuration files are defined.

```json
{
	"website": "https://systelab.github.io/allure-reporter/",
	"projects": [
		{
			"name": "ProjectJSON",
			"inputFolderPath": "test/input/json",
			"outputFolderPath": "test/output/json",
			"saveAsPDF": true,
			"uploadToJAMA": false
		}
	]
}
```

## Execution

To execute this tool, there are 2 ENV variables that need to be defined:

ALLURE_REPORTER_CI_WORKSPACE path where project/workspace is installed
ALLURE_REPORTER_CI_CONFIG_FILE path of the configuration file (relative to the provided workspace)

Then, execute the following command to generate the test reports:

```bash
npm run test
```
