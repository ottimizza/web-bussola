export interface Details {
	remoteAddress: string;
	sessionId?: any;
	tokenValue: string;
	tokenType: string;
	decodedDetails?: any;
}

export interface Principal {
	password?: any;
	username: string;
	authorities: any[];
	accountNonExpired: boolean;
	accountNonLocked: boolean;
	credentialsNonExpired: boolean;
	enabled: boolean;
}

export interface UserAuthentication {
	authorities: any[];
	details: RequestParameters;
	authenticated: boolean;
	principal: Principal;
	credentials?: any;
	name: string;
}

export interface RequestParameters {
	grant_type: string;
	username: string;
}

export interface Oauth2Request {
	clientId: string;
	scope: string[];
	requestParameters: RequestParameters;
	resourceIds: any[];
	authorities: any[];
	approved: boolean;
	refresh: boolean;
	redirectUri?: string;
	responseTypes: any[];
	extensions: any;
	grantType: string;
	refreshTokenRequest?: any;
}

export interface User {
	authorities: any[];
	details: Details;
	authenticated: boolean;
	userAuthentication: UserAuthentication;
	principal: Principal;
	credentials: string;
	oauth2Request: Oauth2Request;
	clientOnly: boolean;
	name: string;
}
