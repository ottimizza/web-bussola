import { AppComponent } from './../../../app.component';
import { UploadService } from './../../../shared/services/upload.service';
import { AuthService } from './../../../shared/auth/auth.service';
import { AnnotationService } from './../../../shared/services/annotation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastService } from 'src/app/shared/services/toast.service';
import { NgxLinkifyjsService } from 'ngx-linkifyjs';
import { FileUpload } from 'primeng/fileupload';

@Component({
	selector: 'app-modal-dashboard',
	templateUrl: './modal-dashboard.component.html',
	styleUrls: ['./modal-dashboard.component.scss']
})
export class ModalDashboardComponent implements OnInit {
	description = '';
	annotations: any;
	isLoading = true;
	noAnnotation = true;

	// tslint:disable-next-line: max-line-length
	regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i;

	constructor(
		public dialogRef: MatDialogRef<ModalDashboardComponent>,
		public linkifyService: NgxLinkifyjsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private annotationService: AnnotationService,
		private authService: AuthService,
		private uploadService: UploadService,
		private toast: ToastService
	) {}

	ngOnInit(): void {
		this.requestAnnotations();
	}

	close() {
		this.dialogRef.close();
	}

	postAnnotation(description?: string) {
		const that = this;
		this.authService.checkTokenExpired(() => {
			that.annotationService
				.postAnnotation(
					that.data.externalId,
					that.data.kpiAlias,
					description || that.description
				)
				.subscribe(res => {
					that.requestAnnotations();
				});
		});
	}

	requestAnnotations() {
		this.isLoading = true;
		const that = this;
		this.authService.checkTokenExpired(() => {
			that.annotationService
				.getAnnotations(that.data.externalId, that.data.kpiAlias)
				.subscribe((annotations: []) => {
					that.annotations = annotations;
					that.description = '';
					that.isLoading = false;
					that.noAnnotation = !(annotations.length > 0);
				});
		});
	}

	deleteAnnotation(id: number) {
		this.annotationService.deleteAnnotation(id).subscribe(() => {
			this.requestAnnotations();
		});
	}

	check(str: string) {
		return str.match(this.regex);
	}

	isFile(str: string) {
		return str.indexOf(AppComponent.storageUrl) === 0;
	}

	goToLink(url: string) {
		window.open(url, '_blank');
	}

	formatDate(date: string) {
		const data = new Date(date);
		return (
			data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
		);
	}

	onUpload(event: FileUpload) {
		this.uploadService
			.uploadSingleFile(event.files[0])
			.subscribe((res: any) => {
				console.log(event);
				this.postAnnotation(
					`${AppComponent.storageUrl}/storage/${res.record.id}/download`
				);
			});
	}

	editAnnotation(annotation: any) {
		const that = this;
		this.annotationService.patchAnnotation(annotation).subscribe(() => {
			that.toast.show('Anotação alterada.', 'success');
		});
	}

	substrFileName(str: string) {
		str = atob(
			str.substring(
				str.indexOf('/storage/') + '/storage/'.length,
				str.indexOf('/download')
			)
		);
		return str.substr(str.indexOf('__') + 2);
	}
}
