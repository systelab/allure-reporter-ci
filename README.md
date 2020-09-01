# Continuous Integration scripts for Allure Reporter

Script to automate use of Allure Reporter on continuous integration.


## Supported features

* Batch PDF generation of test reports 
* Automated upload of test results to JAMA contour (`Not available yet`)


## Setup

### Prerequisites

- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en/)

### Installation

* Clone this repository by executing the following command:
 
```bash
> git clone https://github.com/systelab/cpp-allure-reporter-ci
```

* Install NPM dependencies by running:

```bash
> npm install
```

## Usage

### Script Execution

Prior to the execution of this script, a JSON configuration file needs to be created and the following environment variables need to be defined:

* *ALLURE_REPORTER_CI_WORKSPACE*: Absolute path of the workspace with the Allure test reports to be processed
* *ALLURE_REPORTER_CI_CONFIG_FILE*: Relative path (regards the workspace path) of the JSON configuration file to be used

Finally, this script is executed by running the following command:

```bash
npm run report
```

### Configuration File

The Allure test reports to be processed by this script as well as the actions to be performed with them are defined using a JSON configuration file. This is an example of this file:

```json
{
	"website": "https://systelab.github.io/allure-reporter/",
	"projects": [
		{
			"name": "FirstProject",
			"inputFolderPath": "project1/input",
			"outputFolderPath": "project1/output",
			"saveAsPDF": true,
			"uploadToJAMA": false
		},
		{
			"name": "SecondProject",
			"inputFolderPath": "project2/input",
			"outputFolderPath": "project2/output",
			"saveAsPDF": true,
			"uploadToJAMA": false
		}
	]
}
```

See [test/configuration](https://github.com/systelab/allure-reporter-ci/tree/master/test/configuration) folder for more complete examples of configuration files.


### Batch PDF generation of test reports

Giving the input folder as a generated Allure Reports and the output follder as a result pdf after using the Allure Reporter.

### Automated upload of test results to JAMA contour

`TBD`
