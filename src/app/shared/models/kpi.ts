import { KpiDetail } from './kpi-detail';

export interface Kpi {
	id?: number;
	kpiAlias: string;
	title: string;
	subtitle: string;
	chartType: string;
	labelArray: string[];
	chartOptions: string;
	kpiDetail: KpiDetail[];
}

export interface FormatedKpi {
	id?: number;
	kpiAlias: string;
	title: string;
	subtitle: string;
	chartType: string;
	labelArray: string[];
	chartOptions: any;
	roles: any[];
	data: any[];
	index: number;
}
