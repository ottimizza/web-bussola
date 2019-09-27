import { KpiDetail } from './kpi-detail';

export interface Kpi {
	id?: number;
	kpiAlias: number;
	title: string;
	chartType: string;
	labelArray: string[];
	chartOptions: string;
	kpiDetail: KpiDetail[];
}

export interface KpiFormatado {
	id?: number;
	kpiAlias: number;
	title: string;
	chartType: string;
	labelArray: string[];
	chartOptions: any;
	data: any[];
}
