import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _ds: DataService, private _router: Router) { }

  ngOnInit(): void {
  }

  account_username: any
  account_password: any
  account_info: any = {}

  login() {
    this.account_info.account_username = this.account_username
    this.account_info.account_password = this.account_password

    this._ds.sendApiRequest('login/', this.account_info).subscribe((data: {payload: any}) => {
      this._router.navigate(['/dashboard'])
    })
  }
}
