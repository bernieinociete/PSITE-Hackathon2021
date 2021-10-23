import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any, private dialogReg: MatDialogRef<DialogsComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
