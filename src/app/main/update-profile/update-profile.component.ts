import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UpdateProfileComponent {
  isLogin: boolean = false;
  selectedFiles!: any;
  files!: any;
  imageList!: any;
  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _router: Router,
    private cd: ChangeDetectorRef,
    private app: AppComponent
  ) {}
  ngOnInit() {
    this._api.getImages().subscribe((res: any) => {
      this.files = res?.data;
    });
    this.cd.detectChanges();
  }

  deleteImage(id: any) {
    this.cd.detectChanges();
    this.ngOnInit();
    this._api.deleteImages(id).subscribe((res: any) => {
      console.log('deleted')
    });
    this.ngOnInit();
    this.cd.detectChanges();
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
        }, 9000);
        
      }
    });
    this.selectedFiles = undefined;
  }

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
