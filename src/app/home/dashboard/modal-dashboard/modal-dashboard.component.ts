import { UploadService } from './../../../shared/services/upload.service';
import { AuthService } from './../../../shared/auth/auth.service';
import { AnnotationService } from './../../../shared/services/annotation.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'app-modal-dashboard',
	templateUrl: './modal-dashboard.component.html',
	styleUrls: ['./modal-dashboard.component.scss']
})
export class ModalDashboardComponent implements OnInit {
	description = '';
	annotations: any;

	// tslint:disable-next-line: max-line-length
	regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i;

	constructor(
		public dialogRef: MatDialogRef<ModalDashboardComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private annotationService: AnnotationService,
		private authService: AuthService,
		private uploadService: UploadService
	) {}

	ngOnInit(): void {
		this.requestAnnotations();
	}

	close() {
		this.dialogRef.close();
	}

	postAnnotation() {
		const that = this;
		this.authService.checkTokenExpired(() => {
			that.annotationService
				.postAnnotation(
					that.data.externalId,
					that.data.kpiAlias,
					that.description
				)
				.subscribe(res => {
					that.requestAnnotations();
				});
		});
	}

	requestAnnotations() {
		const that = this;
		this.authService.checkTokenExpired(() => {
			that.annotationService
				.getAnnotations(that.data.externalId, that.data.kpiAlias)
				.subscribe(annotations => {
					that.annotations = annotations;
					that.description = '';
				});
		});
	}

	check(str: string) {
		return str.match(this.regex);
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

	onUpload(event: any) {
		console.log(event);
		this.uploadService.uploadSingleFile(event.files[0]).subscribe(res => {
			console.log(res);
		});
	}
}
