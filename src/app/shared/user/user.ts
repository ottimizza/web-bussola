import { Organization } from './organization';

export interface User {
	id: number;
	username: string;
	email: string;
	phone?: number;
	firstName: string;
	lastName: string;
	type: number;
	avatar?: string;
	organization: Organization;
}
