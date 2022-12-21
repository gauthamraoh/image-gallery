import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false;
  errorMessage: any;
  successMessage: any;
  registerForm!: FormGroup;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.isUserLogin();
    if(this.isLogin){
      this._router.navigate(['\profile']);
    }
    this.registerForm = this.fb.group({
      name: ['', Validators.required ],
      username: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ]
   })
  }

  onSubmit() {
    console.log(this.registerForm.value);
    let form = this.registerForm;
    this._api
      .postTypeRequest('user/register', form.value)
      .subscribe((res: any) => {
        if(res.status === 5) {
          this.errorMessage = res.data;
          setTimeout(() => {
            this.errorMessage = false;
          }, 8000);
        } else if (res.status === 1) {
          console.log(res);
          this.successMessage = 'Registered Successfully Please Login to Your Profile';
          setTimeout(() => {
            this.successMessage = false;
            this._router.navigate(['login']);
          }, 8000);
        } else {
          console.log(res);
        }
      });
  }
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
