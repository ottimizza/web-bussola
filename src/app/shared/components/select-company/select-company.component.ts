import { Company } from './../../models/company';
import {
	OnInit,
	Component,
	Output,
	EventEmitter,
	ElementRef,
	ViewChild
} from '@angular/core';
import { CompanyService } from '@shared/services/company.service';

@Component({
	selector: 'app-select-company',
	templateUrl: 'select-company.component.html',
	styleUrls: ['select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {
	static company: Company;

	companies: Company[] = [];
	pageIndex = 0;
	hasMore = true;
	scrollIsLoading = true;

	private _filter: string;

	set company(company: Company) {
		SelectCompanyComponent.company = company;
		this.selectedCompany.emit(this.company);
	}

	get company(): Company {
		return SelectCompanyComponent.company;
	}

	set filter(filter: string) {
		this._filter = filter;
		this.pageIndex = 0;
		this.hasMore = true;
		this.findCompanies();
	}

	get filter(): string {
		return this._filter;
	}

	@ViewChild('dropdown', { static: false }) dropdownView: ElementRef;
	@Output() selectedCompany = new EventEmitter<Company>();

	filterView: any;

	constructor(private companyService: CompanyService) {}

	ngOnInit() {
		this.company = this.company;

		this.findCompanies(!this.company);

		const that = this;
		$('#scrollContent').on('scroll', function() {
			const scrollTop = $(this).scrollTop();

			if (
				scrollTop + $(this).innerHeight() >= this.scrollHeight - 1 &&
				that.hasMore &&
				!that.scrollIsLoading
			) {
				that.scrollIsLoading = true;
				that.findCompanies();
			}
		});
	}

	findCompanies(firstRequest: boolean = false) {
		this.companyService.getCompanies(this.pageIndex, this.filter).subscribe(
			(response: { records: Company[] }) => {
				console.log(this.pageIndex);

				if (!this.pageIndex) this.companies = response.records;
				else this.companies = this.companies.concat(response.records);

				if (firstRequest) {
					this.company = response.records[0];
				}
				if (response.records.length < 10) this.hasMore = false;
				this.pageIndex++;
			},
			err => {
				console.log(err);
			},
			() => {
				this.scrollIsLoading = false;
			}
		);
	}

	onCompanyChanged(event: any) {
		console.log(event);
		this.company = event;
	}
}
