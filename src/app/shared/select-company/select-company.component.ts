import { CompanyService } from './../services/company.service';
import { OnInit, Component, Output, EventEmitter } from '@angular/core';
import { Company } from '../models/company';

@Component({
	selector: 'app-select-company',
	templateUrl: 'select-company.component.html',
	styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {
	companies: Company[];

	@Output() selectedCompany = new EventEmitter<Company>();

	constructor(private companyService: CompanyService) {}

	ngOnInit() {
		this.companyService.getCompanies().subscribe(
			(response: { records: Company[] }) => {
				this.companies = response.records;
				this.selectedCompany.emit(this.companies[0]);
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
