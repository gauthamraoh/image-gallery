import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-to-profile',
  templateUrl: './add-to-profile.component.html',
  styleUrls: ['./add-to-profile.component.scss'],
})
export class AddToProfileComponent implements AfterViewInit {
  isLogin: boolean = false;
  message: any;
  imageUploadForm!: FormGroup;
  selectedFiles!: any;
  multipartFormData: any;
  currentFile!: File;
  fileInfos!: Observable<any>;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private app: AppComponent
  ) {}
  ngOnInit() {
    this.imageUploadForm = this.fb.group({
      image: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    this.app.isUserLogin();
    this.cd.detectChanges();
  }
  selectFile(event: any) {
    this.selectedFiles = event?.target?.files;
  }

  onSubmit() {
    this._api.upload(this.selectedFiles).subscribe((res:any)=>{
      console.log(res)
      if(res.length>0) {
        setTimeout(() => {
          this.message = undefined;
        }, 9000);
        this.message = 'Uploaded Successfully'
      }
    });
    this.selectedFiles = undefined;
    this.imageUploadForm.reset();
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
