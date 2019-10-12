import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'fs-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() footer: string;
  @Input() open: boolean;
  @Input() hideBtnClose: boolean;

  @Output() closeEvent: EventEmitter<Boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.navMenuBack()
  }

  close() {
    this.open = false;
    this.changeComponentValue(this.open);
    this.navMenuFront();
  }

  changeComponentValue(value) {
    this.closeEvent.emit(value);
  }

  navMenuBack() {
    let nav = document.getElementsByTagName('mat-sidenav')[0];
    nav.classList.add('z-index-0');
  }

  navMenuFront() {
    let nav = document.getElementsByTagName('mat-sidenav')[0];
    nav.classList.remove('z-index-0');
  }

}
