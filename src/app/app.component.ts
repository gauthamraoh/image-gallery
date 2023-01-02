import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from './services/api.service';
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
  closeResult: string = '';
  imageForm!: FormGroup;
  selectedFiles!: any;
  imageList!: any;
  imgCollection!: any;
  message!: any;
  messageChangePassword!: any;
  passwordResetForm!: FormGroup;
  confirmPasswordCheck = false;
  profileImagePath: any = '/assets/images/user.png';
  constructor(private _auth: AuthService, private _router: Router, private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private _api: ApiService,
    private fb: FormBuilder){
    this._router.events.subscribe((val) => this.getName());
  }
  ngOnInit(){
    this.isUserLogin();
    this.getName();
    this.fetchProfileImage();
    this.imageForm = this.fb.group({
      image: ['', Validators.required],
    });
    this.passwordResetForm = this.fb.group({
      oldpassword: ['', Validators.required ],
      password: ['', Validators.required ],
      confirmPassword: ['', Validators.required ]
   })
  }

  onPasswordSubmit() {
    let password = {
      oldpassword: this.passwordResetForm.value.oldpassword,
      newpassword: this.passwordResetForm.value.password
    }
    this._api.resetPassword(password).subscribe((res: any) => {
      if(res.status === 9) {
        setTimeout(() => {
          this.messageChangePassword = undefined;
        }, 8000);
        this.messageChangePassword = "Password Updated"
      } else {
        setTimeout(() => {
          this.messageChangePassword = undefined;
        }, 8000);
        this.messageChangePassword = "Incorrect Old Password"
      }
    });
    this.confirmPasswordCheck = false;
    this.passwordResetForm.reset();
  }

  confirmValidation() {
    if(this.passwordResetForm.value.confirmPassword && this.passwordResetForm.value.password) {
      if(this.passwordResetForm.value.confirmPassword === this.passwordResetForm.value.password) {
        this.confirmPasswordCheck = true;
      } else {
        this.confirmPasswordCheck = false;
      }
    } else {
      this.confirmPasswordCheck = false;
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event?.target?.files;
  }

  fetchProfileImage() {
    const imageApi = 'http://localhost:4000/uploads/'
    debugger
    this._api.getProfileImage().subscribe((res: any) => {
      this.imageList = res?.data;
      if(this.imageList[0].avatar) {
        this.profileImagePath = imageApi + this.imageList[0].avatar;
      } else {
        this.profileImagePath = '/assets/images/user.png'
      }
    });
  }

  onImageSubmit() {
    this._api.uploadImage(this.selectedFiles).subscribe((res:any)=>{
      console.log(res)
      if(res.length>0) {
        setTimeout(() => {
          this.message = undefined;
        }, 9000);
        this.message = 'Uploaded Successfully'
      }
      this.fetchProfileImage();
    });
    this.selectedFiles = undefined;
    this.imageForm.reset();
  }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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
    this.profileImagePath = '/assets/images/user.png'
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
