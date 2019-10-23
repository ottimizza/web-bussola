export interface VariableInfo {
	id: number;
	companyId: number;
	externalId: string;
	name: string;
	variableId: number;
	organizationId?: number;
	accountingCode: string;
	isDefault?: boolean;
	newAccountingCode?: string;
}
