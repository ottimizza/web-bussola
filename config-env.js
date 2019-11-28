const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

function getEnvironmentVariable(key, _default = '') {
	return process.env[key] || _default;
}

const envConfigFile = `export const environment = {
	production: true
   apiBaseUrl: '${getEnvironmentVariable('API_BASE_URL')}',
   apiUrl: '${getEnvironmentVariable('API_URL')}',
   appName: '${getEnvironmentVariable('APP_NAME')}',
   awsPubKey: '${getEnvironmentVariable('AWSKEY')}',
   nodeEnv: '${getEnvironmentVariable('NODE_ENV')}',
   production: '${getEnvironmentVariable('PRODUCTION')}'
};
`;

console.log(`
  ENVIRONMENT -> ${getEnvironmentVariable('ENVIRONMENT')}
  ---
  ${envConfigFile}
`);

fs.writeFile(`./src/environments/environment.prod.ts`, envConfigFile, err => {
	if (err) {
		console.log(err);
	}
});
