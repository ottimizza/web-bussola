const fs = require('fs');
// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const envConfigFile = `export const environment = {
	production: true
   apiBaseUrl: '${process.env.API_BASE_URL}',
   apiUrl: '${process.env.API_URL}',
   appName: '${process.env.APP_NAME}',
   awsPubKey: '${process.env.AWSKEY}',
   nodeEnv: '${process.env.NODE_ENV}',
   production: '${process.env.PRODUCTION}'
};
`;

console.log(`
  ENVIRONMENT -> ${process.env.ENVIRONMENT}
  ---
  ${envConfigFile}
`);

fs.writeFile(`./src/environments/environment.prod.ts`, envConfigFile, err => {
	if (err) {
		console.log(err);
	}
});
