import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public isLogin: any;
  constructor(private _auth: AuthService, private _router: Router){

  }
  ngOnInit(): void {
    if(this.isLogin) {
      this._router.navigate(['\profile']);
    }
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

}
