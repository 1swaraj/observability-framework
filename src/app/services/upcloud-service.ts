import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDoCred } from '../interfaces/do_credentials';
import { IUpcloud } from '../interfaces/upcloud_details';

@Injectable({
  providedIn: 'root'
})
export class UpcloudService {
    
    private apiEndpoint = 'https://czehv8m960.execute-api.ap-southeast-1.amazonaws.com/v0/';
  
    constructor(private http: HttpClient) { }
    
    getCost(creds:IDoCred): Observable<number> {
        const body = JSON.stringify(creds);
        return this.http.post<number>(this.apiEndpoint + "upcloud/cost",body);
    }

    getInstances(creds: IDoCred): Observable<IUpcloud[]> {
        const body = JSON.stringify(creds);
        return this.http.post<IUpcloud[]>(this.apiEndpoint + "upcloud",body);
    }
    
    getFilteredInstances(creds: IDoCred, title: string): Observable<IUpcloud | undefined> {
        return this.getInstances(creds)
            .pipe(
                map((products: IUpcloud[]) => products.find(p => p.title === title))
            );
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }

}