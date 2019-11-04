export interface BalanceItem {
	id: number;
	syntheticId: string;
	analyticId: string;
	description: string;
	initialValue: number;
	finalValue: number;
	debitValue: number;
	creditValue: number;
	dateBalance: string;
	companyId: number;
}
