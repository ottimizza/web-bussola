import { Organization } from './organization';

export interface User {
	id: number;
	username: string;
	email: string;
	phone?: any;
	firstName: string;
	lastName: string;
	type: number;
	avatar: string;
	organization: Organization;
}
