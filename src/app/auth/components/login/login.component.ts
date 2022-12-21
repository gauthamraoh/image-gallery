import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any;
  loginForm!: FormGroup;
  constructor(
    private _api: ApiService, 
    private _auth: AuthService, 
    private _router:Router,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.isUserLogin();
    if(this.isLogin) {
      this._router.navigate(['\profile']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
   });
  }
  
  onSubmit() {
    let form = this.loginForm;
    console.log('Your form data : ', form.value);
    this._api.postTypeRequest('user/login', form.value).subscribe((res: any) => {
      if(res.status === 3) {
        this.errorMessage = res.data;
        setTimeout(() => {
          this.errorMessage = false;
        }, 8000);
      } else if (res.status) { 
        this._auth.setDataInLocalStorage('userData', JSON.stringify(res.data));  
        this._auth.setDataInLocalStorage('token', res.token);
        this._router.navigate(['\profile']);
      }
    }, err => console.log(err)
    )
   
  }
  isUserLogin(){
    if(this._auth.getUserDetails() != null){
        this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  logout(){
    this._auth.clearStorage();
    this.isUserLogin();
    this._router.navigate(['\login']);
  }
}
