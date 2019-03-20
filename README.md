# OsloBysykkel - Bike and lock availability
[![Known Vulnerabilities](https://snyk.io/test/github/trylvis/OsloBysykkel/badge.svg?targetFile=package.json)](https://snyk.io/test/github/trylvis/OsloBysykkel?targetFile=package.json)

## Description
Simple Node.JS app to poll Oslo Bysykkel APIs and present a table with bike and locks availability for each station

### Prerequisites
* Recent version of [NodeJS](https://nodejs.org/en/download/) including NPM
* API key obtained by registering on [Oslo Bysykkel](https://developer.oslobysykkel.no/api)

### Installing

Clone repo from GitHub

```
git clone https://github.com/trylvis/OsloBysykkel.git
```

Enter cloned repo directory

```
cd OsloBysykkel
```

Install necessary NPM packages

```
npm install
```

### Add API key
An API key is required to poll the APIs
You can either add the API key to a enviroment variable - identifierOsloBysykkel used in this app OR
edit the 'identifier' variable in app.js with your API key:

```
// API Identifier
// In the following code a enviroment variable has been used to store the API identifier. You can also comment this line, and un-comment the next line and enter the key identifier directly.
// var identifier = process.env.identifierOsloBysykkel
var identifier = "enterkeyhere";
```

### Running

Start app from the command line

```
node app.js
```

Should return
```
App started and listening on port *port*!
```

