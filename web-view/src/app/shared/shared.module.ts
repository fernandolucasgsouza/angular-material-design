import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatIconModule, MatButtonModule, MatSnackBarModule, MatFormFieldModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatRadioModule, MatSelectModule, MatOptionModule, MatSlideToggleModule,
  MatMenuModule, MatToolbarModule, MatCardModule, MatTableModule, MatPaginatorModule
}
  from '@angular/material';

import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,

    ModalComponent
  ],
  providers: [ModalComponent]
})
export class SharedModule { }
