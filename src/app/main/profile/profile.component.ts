import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class ProfileComponent implements OnInit, AfterViewInit {
  @ViewChild(AppComponent) child:any;
  public protectedData: any
  public loading: boolean = false;
  imageList!: any;
  imageWidth: any;
  slideImage!: any;
  imgCollection: Array<object> = [];
  onResize(event:any){
    if(event.target.innerWidth < 480 ) {
      this.imageWidth = { width: '100%', height: 300, space: 1 }
      this.slideImage = 1
    } else {
      this.imageWidth = { width: '25%', height: 300, space: 10 }
      this.slideImage = 2
    }
  }

  constructor(
    private _api: ApiService,
    private app: AppComponent,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this._api.getTypeRequest('profile/profile').subscribe((res: any) => {
    //   this.protectedData = res
    // });
    const imageApi = 'http://localhost:4000/uploads/'
    this._api.getImages().subscribe((res: any) => {
      this.imageList = res?.data;
      this.imageList.forEach((element:any) => {
        this.imgCollection.push({image: imageApi + element.image, thumbImage: imageApi + element.image,
          alt: element.image, title: element.image})
      });
    });
    if(window.innerWidth < 480) {
      this.imageWidth = { width: '100%', height: 300, space: 1 }
      this.slideImage = 1
    } else {
      this.imageWidth = { width: '25%', height: 300, space: 10 }
      this.slideImage =2
    }
  }

  ngAfterViewInit(): void {
    this.app.isUserLogin();
    this.cd.detectChanges();
  }

}