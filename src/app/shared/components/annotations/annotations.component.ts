import { environment } from '@env';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileUpload } from 'primeng/fileupload';
import { AnnotationService } from '@shared/services/annotation.service';
import { UploadService } from '@shared/services/upload.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
	selector: 'app-annotations',
	templateUrl: './annotations.component.html',
	styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit {
	description = '';
	annotations: any;
	isLoading = true;
	noAnnotation = true;

	// tslint:disable-next-line: max-line-length
	regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i;

	constructor(
		public dialogRef: MatDialogRef<AnnotationsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private annotationService: AnnotationService,
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
		this.isLoading = true;

		this.annotationService
			.postAnnotation(
				this.data.externalId,
				this.data.kpiAlias,
				description || this.description
			)
			.subscribe(res => {
				this.requestAnnotations();
			});
	}

	requestAnnotations() {
		this.annotationService
			.getAnnotations(this.data.externalId, this.data.kpiAlias)
			.subscribe((annotations: []) => {
				this.annotations = annotations;
				this.description = '';
				this.isLoading = false;
				this.noAnnotation = !(annotations.length > 0);
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
		return str.indexOf(environment.storageUrl) === 0;
	}

	goToLink(url: string) {
		window.open(url, '_blank');
	}

	formatDate(date: string) {
		const data = new Date(date);
		return (
			data.getDate() +
			'/' +
			(data.getMonth() + 1) +
			'/' +
			data.getFullYear()
		);
	}

	onUpload(event: FileUpload) {
		this.isLoading = true;
		this.uploadService
			.uploadSingleFile(event.files[0])
			.subscribe((res: any) => {
				this.postAnnotation(
					`${environment.storageUrl}/storage/${res.record.id}/download`
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
