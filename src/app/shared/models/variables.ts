export interface VariableInfo {
	id: number;
	companyId: number;
	externalId: string;
	name: string;
	variableId: number;
	organizationId?: number;
	accountingCode: string;
	originValue: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	absoluteValue: boolean;
}
