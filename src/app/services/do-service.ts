import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDoCred } from '../interfaces/do_credentials';
import { IDroplet } from '../interfaces/droplet_details';

@Injectable({
  providedIn: 'root'
})
export class DoService {
    
    private apiEndpoint = 'https://2hwk5p074d.execute-api.ap-southeast-1.amazonaws.com/v1/';
  
    constructor(private http: HttpClient) { }
    
    getCost(creds:IDoCred): Observable<number> {
        const body = JSON.stringify(creds);
        return this.http.post<number>(this.apiEndpoint + "do/cost",body);
    }

    getInstances(creds: IDoCred): Observable<IDroplet[]> {
        const body = JSON.stringify(creds);
        return this.http.post<IDroplet[]>(this.apiEndpoint + "do",body);
    }
    
    getFilteredInstances(creds: IDoCred, name: string): Observable<IDroplet | undefined> {
        return this.getInstances(creds)
            .pipe(
                map((products: IDroplet[]) => products.find(p => p.name === name))
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