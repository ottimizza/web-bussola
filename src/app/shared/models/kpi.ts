import { KpiDetail } from './kpi-detail';

export interface Kpi {
	id?: number;
	title: string;
	chartType: string;
	labels: string[];
	kpiDetail: KpiDetail[];
}

export interface KpiFormatado {
	id?: number;
	title: string;
	chartType: string;
	labels: string[];
	data: any[];
}
