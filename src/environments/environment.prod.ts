export const environment = {
	production: true,
	oauthBaseUrl: process.env['API_OAUTH_SERVICE'] || '',
	appApi: process.env['APP_API'] || '',
	storageUrl: process.env['STORAGE_URL'] || '',
	oauthClientId: process.env['CLIENT_ID'] || '',
	applicationId: process.env['APPLICATION_ID'] || '',
	firebase: {
		apiKey: 'your apikey',
		authDomain: 'your authDomain',
		databaseURL: 'your databaseUrl',
		projectId: 'your projectId',
		storageBucket: 'your storageBucket',
		messagingSenderId: 'your messagingSenderId'
	}
};
