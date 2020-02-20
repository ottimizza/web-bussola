export interface GoogleChart {
	data: Array<Array<string | number>>;
	columnNames: Array<string>;
	roles: Array<Role>;
	title: string;
	width: number;
	height: number;
	options: any;
	type: string;
	ngOnInit(): void;
	ngOnChanges(): void;
	parseOptions(): any;
	createChart(): void;
	getDataTable(): Array<any>;
}

export interface Role {
	type: string;
	role: string;
	p?: object;
	index?: number;
}
