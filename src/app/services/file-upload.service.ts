import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FileUploadService {

    constructor(private http: Http) {

    }


    public saveRecordAndFiles(id: number, record: any, fileListArray: any[]): Observable<any> {

        let formData: FormData = new FormData();
        // roll the file info into the form data and add the view model
        if (undefined !== fileListArray && 0 < fileListArray.length) {
            fileListArray.forEach((item: any) => {
                for (let i: number = 0; i < item.length; i++) {
                    formData.append("file[]", item[i], item[i].name);
                }
            });
        }
        formData.append('viewModel', JSON.stringify(record));

        let headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        //headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        let options = new RequestOptions({ headers: headers });

        let route: string = "api/fileupload";
        if (undefined !== id && 0 < id) { route += "/" + id.toString(); }

        return this.http.post(route, formData, options)
            .map(response => response.json())
            .catch(error => Observable.throw(error));
    }
}