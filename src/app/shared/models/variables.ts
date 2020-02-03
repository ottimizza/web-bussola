export interface VariableInfo {
	id: number;
	variableId: number;
	organizationId: number;
	scriptId: number;
	accountingCode: string;
	originValue: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	absoluteValue: boolean;
}

export interface AccountingVariableInfo {
	id: number;
	accountingId: number;
	scriptId: number;
	variableCode: number;
	name: string;
	description: string;
	accountingCode: string;
	originValue: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	absoluteValue: boolean;
}
