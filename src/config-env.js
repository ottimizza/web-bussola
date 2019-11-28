const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

function getEnvironmentVariable(key, _default = '') {
	return process.env[key] || _default;
}

const envConfigFile = `export const environment = {
	production: true,
  oauthBaseUrl: '${getEnvironmentVariable('API_OAUTH_SERVICE')}',
  appApi: '${getEnvironmentVariable('APP_API')}',
  storageUrl: '${getEnvironmentVariable('STORAGE_URL')}',
  oauthClientId: '${getEnvironmentVariable('CLIENT_ID')}',
  applicationId: '${getEnvironmentVariable('APPLICATION_ID')}'
};
`;

fs.writeFile(`./src/environments/environment.prod.ts`, envConfigFile, err => {
	if (err) {
		console.log(err);
	}
});
