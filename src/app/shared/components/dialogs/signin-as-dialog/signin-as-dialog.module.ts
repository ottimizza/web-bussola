import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { SigninAsDialogComponent } from './signin-as-dialog.component';
import { InfoModule } from '@shared/components/info/info.module';

@NgModule({
  declarations: [SigninAsDialogComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

    MatPaginatorModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,

    ComplexSearchModule,
    InfoModule
  ],
  exports: [SigninAsDialogComponent]
})
export class SigninAsDialogModule { }
