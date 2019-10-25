import { VariableInfo } from './../shared/models/variables';
import { VariablesService } from './../shared/services/variables.service';
import { CompanyService } from './../shared/services/company.service';
import { Component, OnInit } from '@angular/core';
import { Company } from '../shared/models/company';

@Component({
	selector: 'app-variables',
	templateUrl: './variables.component.html',
	styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {
	companies: Company[];
	selectedCompany: Company;

	variables: VariableInfo[];

	constructor(
		private companyService: CompanyService,
		private variablesService: VariablesService
	) {}

	ngOnInit(): void {
		this.variables = [];
		this.companyService.getCompanies().subscribe(
			(response: any) => {
				this.companies = response.records;
				this.selectedCompany = this.companies[0];
				this.requestVariables();
				this.requestMissingVariables();
			},
			err => {
				console.log(err);
			}
		);
	}

	requestVariables() {
		this.variablesService
			.requestCompanyVariables(this.selectedCompany.id)
			.subscribe((res: VariableInfo[]) => {
				this.variables = this.variables.concat(res);
			});
	}

	requestMissingVariables() {
		this.variablesService
			.requestMissingVariables(this.selectedCompany.id)
			.subscribe((res: VariableInfo[]) => {
				this.variables = this.variables.concat(res);
			});
	}

	onCompanyChanged() {
		this.variables = [];
		this.requestVariables();
		this.requestMissingVariables();
	}
}
