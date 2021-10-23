import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  formData: FormData = new FormData();

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogsComponent>, private _ds: DataService, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pullRank()
    this.pullSpeed()
  }

  sendMessage(): void {
    this._ds.sendUpdate('Message from Sender Component to Receiver Component!');
  }
  
  // RANKS
  rank_data: any[] = []
  pullRank() {
    this._ds.sendApiRequest('rank/', null).subscribe((data: {payload: any}) => {
      this.rank_data = data.payload
    })
  }

  // SPEED CLASS
  ship_speed_data: any[] = []
  pullSpeed() {
    this._ds.sendApiRequest('ship_speed/', null).subscribe((data: {payload: any}) => {
      this.ship_speed_data = data.payload
    })
  }

  // ADD CREW
  files: File[] = []
  onSelect(event: any) {   
    console.log(event.target.files)
    this.files.push(event.target.files)
    for (var i = 0; i < this.files.length; i++) {
      this.formData.append('crew_contract[]', event.target.files[i])
    }
  }

  crew_fname: any
  crew_mname: any
  crew_lname: any
  rank_id: any
  crew_contract: any
  addCrew() {
    this.formData.append('crew_fname', this.crew_fname)
    this.formData.append('crew_mname', this.crew_mname)
    this.formData.append('crew_lname', this.crew_lname)
    this.formData.append('rank_id', this.rank_id)

    this._ds.sendFileRequest('addCrew', this.formData).subscribe((data: {payload:any}) => {
      this.sendMessage()
    }, (er:any)=>{
      this._snackBar.open("Wrong Credentials", 'Try Again', {
        duration:1500
      });
    })
  }

  // ADD CREW

  // ADD SHIP
  ship_name: any
  ship_speed_id: any
  ship_info: any = {}
  addShip() {
    this.ship_info.ship_name = this.ship_name
    this.ship_info.ship_speed_id = this.ship_speed_id

    this._ds.sendApiRequest('addShip', this.ship_info).subscribe((data: {payload:any}) => {
      this.sendMessage()
    })
  }
  // ADD SHIP

  closeDialog(){
    this.dialogRef.close();
  }
}
