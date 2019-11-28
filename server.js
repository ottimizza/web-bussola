const express = require('express');

const app = express();

const path = require('path');

const compression = require('compression');

const zlib = require('zlib');

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

console.log(envConfigFile);
fs.writeFile('./src/environments/environment.ts', envConfigFile, err => {
	if (err) {
		throw console.error(err);
	} else {
		console.log(
			`Angular environment.ts file generated correctly at ${targetPath} \n`
		);
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
