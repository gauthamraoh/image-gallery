import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'angular_app';
  isLogin = false;
  userName!: any;
  // @ViewChild(ChildComponent) child;
  constructor(private _auth: AuthService, private _router: Router, private cd: ChangeDetectorRef){
    this._router.events.subscribe((val) => this.getName());
  }
  ngOnInit(){
    this.isUserLogin();
    this.getName();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', JSON.stringify(changes))
    this.getName();
  }

  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    this.cd.detectChanges()
  }
  logout(){
    this._auth.clearStorage();
    this.isUserLogin();
    this.getName();
    this._router.navigate(['\login']);
  }

  getName() {
    if(localStorage.getItem('userData')) {
      let userJson = JSON.parse(localStorage.getItem("userData") || "[]");
      this.userName = userJson[0].name;
    } else {
      this.userName = undefined;
    }
  }
}
