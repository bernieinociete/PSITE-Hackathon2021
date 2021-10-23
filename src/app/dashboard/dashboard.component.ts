import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private _ds: DataService, private _router: Router) { }

  ngOnInit(): void {
  }

  openDialog(option:any){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.maxWidth = '400px';
    
    dialogConfig.data = {
      option: option
    }

    const dialogRef = this.dialog.open(DialogsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this._router.navigate(['/'])
  }

}
