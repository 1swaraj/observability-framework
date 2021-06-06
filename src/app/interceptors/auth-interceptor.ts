import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Auth } from "aws-amplify";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        let jwtToken = localStorage.getItem("jwtToken");
        let expiry = parseInt(localStorage.getItem("expiry"))
        const currentTime = Date.now()/1000 | 0;
        const hasExpired = expiry <= currentTime
        if (jwtToken==null || hasExpired) {
            Auth.currentSession().then(data => {
                let accessToken = data.getAccessToken()
                jwtToken = accessToken.getJwtToken()
                localStorage.setItem("jwtToken", jwtToken)
                localStorage.setItem("expiry", accessToken.getExpiration().toString())
            }).catch(err => localStorage.removeItem("jwtToken"));
        }
        if (jwtToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",jwtToken)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
