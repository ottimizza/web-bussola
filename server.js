import { writeFile } from 'fs';

import express, { static } from 'express';

const app = express();

import { join } from 'path';

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

//  Would be passed to  like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = 'prod';
const isProd = environment === 'prod';

const targetPath = './dist/assets/data/appConfig.json';
const envConfigFile = `
{
	"apiOauthService": "${process.env.API_OAUTH_SERVICE}",
	"loginUrl": "${process.env.LOGIN_URL}",
	"appApi": "${process.env.APP_API}"
}
`;

writeFile(targetPath, envConfigFile, function(err) {
	if (err) {
		console.log('ERRO!\n' + err);
	}
});

app.use(static(__dirname + '/dist'));

app.listen(process.env.PORT || 8080);

app.get('*', function(req, res) {
	res.sendFile(join(__dirname + '/dist/index.html'));
});
