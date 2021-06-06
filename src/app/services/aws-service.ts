import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAwsCred } from '../interfaces/aws_credentails';
import { IAwsec2 } from '../interfaces/aws_ec2_details';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
    
    private apiEndpoint = 'https://czehv8m960.execute-api.ap-southeast-1.amazonaws.com/v0/';
  
    constructor(private http: HttpClient) { }
    
    getCost(creds:IAwsCred): Observable<number> {
        const body = JSON.stringify(creds);
        return this.http.post<number>(this.apiEndpoint + "aws/cost",body);
    }

    getInstances(creds:IAwsCred): Observable<IAwsec2[]> {
        const body = JSON.stringify(creds);
        return this.http.post<IAwsec2[]>(this.apiEndpoint + "aws",body);
    }
    
    getFilteredInstances(creds:IAwsCred,id: string): Observable<IAwsec2 | undefined> {
        return this.getInstances(creds)
            .pipe(
                map((products: IAwsec2[]) => products.find(p => p.identifier === id))
        );
    }

    stopInstance(creds:IAwsCred): Observable<any> {
        const body = JSON.stringify(creds);
        return this.http.post(this.apiEndpoint + 'aws/stop', body)
    }

    terminateInstance(creds:IAwsCred): Observable<any> {
        const body = JSON.stringify(creds);
        return this.http.post(this.apiEndpoint + 'aws/terminate', body)
    }

    resumeInstance(creds:IAwsCred): Observable<any> {
        const body = JSON.stringify(creds);
        return this.http.post(this.apiEndpoint + 'aws/resume', body)
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