import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./auth/user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";

export interface AuthResponseData
{
    idToken: string;
    email; string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({providedIn:"root"})
export class AuthService
{
    user = new BehaviorSubject<User>(null)
    private expTimeout : any;
    constructor(private http: HttpClient, private router: Router){

    }
    signup(email: string, password: string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>
            {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }))

    }

    login(email: string, password: string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,{
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData =>
            {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
            }))
    }

    logout()
    {
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('userData');
        if(this.expTimeout)
        {
            clearTimeout(this.expTimeout);
        }
        this.expTimeout = null;
    }

    autoLogout(expireDuration)
    {
        console.log(expireDuration);
        
       this.expTimeout = setTimeout(()=>{
            this.logout();
        },expireDuration)
    }

    handleError(errorRes: HttpErrorResponse)
    {
        let errorMessage = 'Something went wrong';
            if(!errorRes.error || !errorRes.error.error || !errorRes.error.error.message)
                return throwError(errorMessage)
            switch(errorRes.error.error.message)
            {
                case 'EMAIL_EXISTS': errorMessage='this email is already exists'
                    break;
                case 'EMAIL_NOT_FOUND': errorMessage='Invalid Email address'
                    break;
                case 'INVALID_PASSWORD': errorMessage='Invalid password. Please put correct password'
                    break;
                case 'USER_DISABLED': errorMessage='User account has been disabled by administrator'
                    break;
                case 'INVALID_LOGIN_CREDENTIALS': errorMessage='Login  credentials are Invalid'
                    break;
            }
            return throwError(errorMessage)
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn : number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, id, token, expirationDate)
        this.user.next(user)
        localStorage.setItem('userInfo',JSON.stringify(user))
        this.autoLogout(expiresIn*1000);
    }

    autoLogin()
    {
        const userData: {email: string,
        id: string,
        _token: string,
        _tokenExpiresAt: string} = JSON.parse(localStorage.getItem('userInfo'))
        if(!userData)
            return;

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpiresAt))
        if(loadedUser.token)
        {
            this.user.next(loadedUser);
            const newExpirationTime = new Date(userData._tokenExpiresAt).getTime()-new Date().getTime()
            this.autoLogout(newExpirationTime)
        }
    }
}