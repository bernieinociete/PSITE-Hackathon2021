import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message: any
  private subs: Subscription

  displayedColumnsCrew: string[] = ['crew_id', 'crew_name', 'crew_rank', 'crew_status']
  dataSourceCrew: any

  displayedColumnsShip: string[] = ['ship_id', 'ship_name', 'ship_class', 'ship_speed']
  dataSourceShip: any
  
  constructor(public dialog: MatDialog, private _ds: DataService, private _router: Router, public _snackbar: MatSnackBar) {
    this.subs = this._ds.getUpdate().subscribe(message => {
      this.message = message
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.pullCrew()
    this.pullShip()
  }

  // CREW
  crew_data: any[] = []
  pullCrew() {
    this._ds.sendApiRequest('crew/', null).subscribe((data: {payload: any}) => {
      this.crew_data = data.payload;
      this.dataSourceCrew = new MatTableDataSource(this.crew_data);
    })
  }
  // CREW

  // SHIP
  ship_data: any[] = []
  pullShip() {
    this._ds.sendApiRequest('ship/', null).subscribe((data: {payload: any}) => {
      this.ship_data = data.payload;
      this.dataSourceShip = new MatTableDataSource(this.ship_data);
    })
  }
  // SHIP

  // DIALOG
  openDialog(option:any){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.maxWidth = '400px'
    
    dialogConfig.data = {
      option: option
    }

    const dialogRef = this.dialog.open(DialogsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    });
  }


}
