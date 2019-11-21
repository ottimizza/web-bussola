const express = require('express');

const app = express();

const path = require('path');

const compression = require('compression');

const zlib = require('zlib');

const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file

require('dotenv').config();

function getEnvironmentVariable(key, _default = '') {
	return process.env[key] || _default;
}

function createEnvironementFile() {
	return `export const environment = {
  production: true,
  oauthBaseUrl: '${getEnvironmentVariable('OAUTH2_BASE_URL')}',
	appApiUrl: '${getEnvironmentVariable('APP_API_URL')}'
	storageUrl: '${getEnvironmentVariable('STORAGE_URL')}'
	oauthClientId: '${getEnvironmentVariable('OAUTH2_CLIENT_ID')}',
	applicationId: '${getEnvironmentVariable('APPLICATION_ID')}'
};`;
}

const PACKAGE_NAME = getEnvironmentVariable('npm_package_name');

console.log(PACKAGE_NAME);

const environment = getEnvironmentVariable('ENVIRONMENT');
const environmentFile = createEnvironementFile();

console.log(`
  ENVIRONMENT -> ${environment}
  ---
  ${environmentFile}
`);

fs.writeFile(`./src/environments/environment.ts`, environmentFile, err => {
	if (err) {
		console.log(err);
	}
});

app.use(express.static(__dirname + '/dist/bussola-pwa'));

app.disable('etag');

app.use(compression(zlib.Z_BEST_COMPRESSION));

app.listen(process.env.PORT || 4200);

// redirect traffic to index.html

app.get('*', function(req, res) {
	const index = __dirname + '/dist/bussola-pwa/index.html';
	res.sendFile(path.join(index));
});
