import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            Swal.fire({
                  icon: 'error',
                  title: "Oops !!",
                  text: "Something went wrong please retry."
              })
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
              Swal.fire({
                  icon: 'error',
                  title: "Server returned an error",
                  text: "You might want to cross-verify if your entered credentials have appropriate permissions"
              })
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
  }
}
