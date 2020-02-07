export interface Description {
	id: number;
	accountingId: number;
	kpiAlias: string;
	cnpj: string;
	description?: string;
	scriptType: number;
	title: string;
	graphOrder: number;
	chartType: string;
	visible: boolean;
}
