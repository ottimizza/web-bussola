import { KpiDetail } from './kpi-detail';
import { Role } from 'angular-google-charts/lib/models/role.model';

export interface Kpi {
	id?: number;
	kpiAlias: string;
	title: string;
	chartType: string;
	labelArray: string[];
	chartOptions: string;
	kpiDetail: KpiDetail[];
}

export interface KpiFormatado {
	id?: number;
	kpiAlias: string;
	title: string;
	chartType: string;
	labelArray: string[];
	chartOptions: any;
	roles: any[];
	data: any[];
}
