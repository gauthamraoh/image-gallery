import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:4000/';
  constructor(private _http: HttpClient) {}
  getTypeRequest(url: any) {
    return this._http.get(`${this.baseUrl}${url}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
  postTypeRequest(url: any, payload: any) {
    return this._http.post(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  putTypeRequest(url: any, payload: any) {
    return this._http.put(`${this.baseUrl}${url}`, payload).pipe(
      map((res) => {
        return res;
      })
    );
  }

  upload(files: FileList) {
    const formData = new FormData();
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('files', element, element.name);
    }
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this._http.post(`${this.baseUrl}user/multifiles/${userJson[0].id}`, formData, {headers}).pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  uploadImage(files: FileList) {
    const formData = new FormData();
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('files', element, element.name);
    }
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this._http.post(`${this.baseUrl}user/profileimage/${userJson[0].id}`, formData, {headers}).pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  getImages() {
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this._http.post(`${this.baseUrl}user/images/${userJson[0].id}`, '').pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  deleteImages(id: any) {
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    return this._http.delete(`${this.baseUrl}user/deletemedia/${id}/${userJson[0].id}`).pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  getProfileImage() {
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this._http.post(`${this.baseUrl}user/image/${userJson[0].id}`, '').pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  resetPassword(password: any) {
    const userJson = JSON.parse(localStorage.getItem("userData") || "[]");
    let data = {
      id: userJson[0].id,
      oldpassword: password.oldpassword,
      newpassword: password.newpassword
    }
    return this._http.post(`${this.baseUrl}user/resetpassword`, data).pipe(
      map((res) => {
        return res;
      }), catchError((err) => {
          throw 'Error in source. Details'
      })
    )
  }

  getFiles(): Observable<any> {
    return this._http.get(`${this.baseUrl}/files`);
  }
}
