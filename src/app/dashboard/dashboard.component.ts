import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  message: any;
  private subs: Subscription;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
  constructor(public dialog: MatDialog, private _ds: DataService, private _router: Router, public _snackbar: MatSnackBar) {
    this.subs = this._ds.getUpdate().subscribe(message => {
      this.message = message;
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.pullCrew()
    this.pullShip()
  }

  // CREW
  pullCrew() {
    this._ds.sendApiRequest('crew/', null).subscribe((data: {payload: any}) => {
      console.log(data.payload)
    })
  }
  // CREW

  // SHIP
  pullShip() {
    this._ds.sendApiRequest('ship/', null).subscribe((data: {payload: any}) => {
      console.log(data.payload)
    })
  }
  // SHIP

  // DIALOG
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
