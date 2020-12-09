import { Company } from './../../models/company';
import {
	OnInit,
	Component,
	Output,
	EventEmitter,
	ElementRef,
	ViewChild,
	HostListener,
	Input
} from '@angular/core';
import { CompanyService } from '@shared/services/company.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatExpansionPanel } from '@angular/material/expansion';
import { DocUtils } from '@shared/utils/doc.utils';

@Component({
	selector: 'app-select-company',
	templateUrl: 'select-company.component.html',
	styleUrls: ['select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {
	static company: Company;

	@Input() isFetching = false

	companies: Company[] = [];
	pageIndex = 0;
	hasMore = true;
	isLoading = true;

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(map(result => result.matches));

	private _filter: string;

	set company(company: Company) {
		SelectCompanyComponent.company = company;
		if (company) {
			window.sessionStorage.setItem('cnpj', company.cnpj);
		}
		this.selectedCompany.emit(this.company);
	}

	get company(): Company {
		return SelectCompanyComponent.company;
	}

	set filter(filter: string) {
		this._filter = filter;
	}

	get filter(): string {
		return this._filter;
	}

	@ViewChild('dropdown') dropdownView: ElementRef<
		MatExpansionPanel
	>;
	@Output() selectedCompany = new EventEmitter<Company>();

	private filterSubject = new Subject();

	filterView: any;

	panelOpenState = false;

	// @HostListener('window:resize', ['$event'])
	// onResize(event) {
	// 	this.selectedCompany.emit(this.company);
	// }

	constructor(
		private companyService: CompanyService,
		private breakpointObserver: BreakpointObserver
	) {}

	ngOnInit() {
		this.filterSubject.pipe(debounceTime(300)).subscribe(() => {
			if (!this.isLoading) {
				this.pageIndex = 0;
				this.hasMore = true;
				this.findCompanies();
			} else this.filterSubject.next();
		});

		this.company = this.company;

		this.findCompanies(!this.company);

		const that = this;
		$('#scrollContent').on('scroll', function() {
			const scrollTop = $(this).scrollTop();

			if (
				scrollTop + $(this).innerHeight() >= this.scrollHeight - 1 &&
				that.hasMore &&
				!that.isLoading
			) {
				that.isLoading = true;
				that.findCompanies();
			}
		});
	}

	findCompanies(firstRequest: boolean = false) {
		this.companyService.getCompanies(this.pageIndex, this.filter).subscribe(
			(response: { records: Company[] }) => {
				if (!this.pageIndex) this.companies = response.records;
				else this.companies = this.companies.concat(response.records);

				if (firstRequest) {
					this.company = response.records[0];
				}
				if (response.records.length < 10) this.hasMore = false;
				else this.pageIndex++;
			},
			err => {
				console.log(err);
			},
			() => {
				this.isLoading = false;
			}
		);
	}

	onCompanyChanged(event: any) {
		this.panelOpenState = !this.panelOpenState;
		this.company = event;
	}

	updateFilter() {
		this.filterSubject.next();
	}

	public applyMask(doc: string) {
		return DocUtils.formatDocForCompanySelector(doc);
	}
}
