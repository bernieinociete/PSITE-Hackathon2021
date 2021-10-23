import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import geoDistance from '../geoDistance';


@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {
  formData: FormData = new FormData();

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogsComponent>, private _ds: DataService, public _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.pullRank()
    this.pullSpeed()
    this.pullShip()
    this.pullCrew()
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

  // SHIP
  ship_data: any[] = []
  pullShip() {
    this._ds.sendApiRequest('ship/', null).subscribe((data: {payload: any}) => {
      this.ship_data = data.payload
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
  crew_mname: any = ''
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
      this.closeDialog()
      this._snackBar.open("Success", 'Okay', {
        duration:1500
      });

    }, (er:any)=>{
      this._snackBar.open("Failed", 'Try Again', {
        duration:1500
      })
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
      this.closeDialog()
      this._snackBar.open("Success", 'Okay', {
        duration:1500
      });
    }, (er:any)=>{
      this._snackBar.open("Failed", 'Try Again', {
        duration:1500
      });
    })
  }
  // ADD SHIP

  // ADD TRANSACTION
  transaction_no: any
  transaction_eta: any
  transaction_origin_latitude: any
  transaction_origin_longitude: any
  transaction_destination_latitude: any
  transaction_destination_longitude: any
  unit_distance: any = 'K'
  ship_id: any
  transaction_info: any = {}

  addTransaction() {

  }

  distance: any
  computeETA() {
    this.transaction_info.transaction_no = this.transaction_no
    this.transaction_info.transaction_eta = this.transaction_eta
    this.transaction_info.transaction_origin_latitude = this.transaction_origin_latitude
    this.transaction_info.transaction_origin_longitude = this.transaction_origin_longitude
    this.transaction_info.transaction_destination_latitude = this.transaction_destination_latitude
    this.transaction_info.transaction_destination_longitude = this.transaction_destination_longitude

    const point1 = { lat: this.transaction_origin_latitude, lng: this.transaction_origin_longitude}
    const point2 = { lat: this.transaction_destination_latitude, lng: this.transaction_destination_longitude}

    console.log(point1)
    console.log(point2)
    this.distance = geoDistance(point1, point2, this.unit_distance)
    const eta = 23/this.distance
    console.log(this.distance)

    this._ds.sendApiRequest('ship/' + this.ship_id, null).subscribe((data: {payload: any}) => {
      let ship_speed;
      ship_speed = data.payload[0].ship_speed_knots

      if(this.unit_distance == 'K') {
        let speed = ship_speed * 1.852
        this.transaction_eta = this.distance/speed

        this._ds.sendApiRequest('addTransaction/', this.transaction_info).subscribe((data: {payload: any}) => { 
          this.sendMessage()
        })
      }
      if(this.unit_distance == 'N') {
        let distance = this.distance * 1.852
        let speed = ship_speed * 1.852
        this.transaction_eta = distance/speed
      }
    })
  }
  // ADD TRANSACTION

  closeDialog(){
    this.dialogRef.close()
  }

  logout() {
    this._router.navigate(['/'])
    this.closeDialog();
  }

  crew_data: any[] = []
  pullCrew() {
    this._ds.sendApiRequest('crew/', null).subscribe((data: {payload: any}) => {
      this.crew_data = data.payload;
    })
  }
}
