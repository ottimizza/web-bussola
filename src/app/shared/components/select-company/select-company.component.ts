import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { Company } from '@shared/models/company';
import { CompanyService } from '@shared/services/company.service';

@Component({
	selector: 'app-select-company',
	templateUrl: 'select-company.component.html',
	styleUrls: ['select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {
	companies: Company[] = [];

	pageIndex = 0;

	// private _filter: string;

	// get filter() {
	// 	return this._filter;
	// }

	// set filter(value: string) {
	// 	this._filter = value;
	// }

	@Output() selectedCompany = new EventEmitter<Company>();

	constructor(private companyService: CompanyService) {}

	ngOnInit() {
		this.findCompanies(true);
	}

	findCompanies(firstRequest: boolean) {
		this.companyService.getCompanies(this.pageIndex).subscribe(
			(response: { records: Company[] }) => {
				this.companies = this.companies.concat(response.records);
				if (firstRequest) this.selectedCompany.emit(this.companies[0]);
				this.pageIndex++;
				if (response.records.length === 30) this.findCompanies(false);
			},
			err => {
				console.log(err);
			}
		);
	}

	onCompanyChanged(event: any) {
		this.selectedCompany.emit(event.value);
	}
}
