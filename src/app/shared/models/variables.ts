export interface VariableInfo {
	id: number;
	companyId: number;
	variableCode: string;
	name: string;
	variableId: number;
	scriptId: number;
	originValue: number;
	absoluteValue: boolean;
	accountingId: number;
	accountingCode: string;
	kpiAlias: string;
	description: string;
}

export interface AccountingVariableInfo {
	id: number;
	accountingId: number;
	scriptId: number;
	variableCode: number;
	name: string;
	description: string;
	accountingCode: string;
	originValue: number;
	absoluteValue: boolean;
}
