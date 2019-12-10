import { CompanyService } from '@shared/services/company.service';
import { Company } from '@shared/models/company';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'company-select-dropdown',
	templateUrl: './company-select-dropdown.component.html',
	styleUrls: ['./company-select-dropdown.component.scss']
})
export class CompanySelectDropdownComponent implements OnInit {
	static selectedCompany: Company;
	static companies: Company[] = [];

	@Output() companyChanged = new EventEmitter<Company>();

	set companies(value: Company[]) {
		CompanySelectDropdownComponent.companies = value;
	}

	get companies(): Company[] {
		return CompanySelectDropdownComponent.companies;
	}

	set selectedCompany(value: Company) {
		CompanySelectDropdownComponent.selectedCompany = value;
		this.companyChanged.emit(value);
	}

	get selectedCompany(): Company {
		return CompanySelectDropdownComponent.selectedCompany;
	}

	pageIndex = 0;

	config = {
		displayKey: 'name'
	};

	constructor(private companyService: CompanyService) {}

	ngOnInit(): void {
		this.findCompanies(true);
	}

	findCompanies(firstRequest: boolean) {
		this.companyService.getCompanies(this.pageIndex).subscribe(
			(response: { records: Company[] }) => {
				this.companies = this.companies.concat(response.records);
				// if (firstRequest) this.selectedCompany = this.companies[0];
			},
			err => {
				console.log(err);
			}
		);
	}
}
