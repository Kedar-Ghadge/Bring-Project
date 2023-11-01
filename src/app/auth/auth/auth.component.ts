import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService:AuthService, private router: Router) {

  }

  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm)
  {
    let authObs: Observable<AuthResponseData>

    if(!authForm.valid)
    return

    let email = authForm.value.email
    let password = authForm.value.password

    this.isLoading=true;
    if(this.isLoginMode)
    {
      authObs = this.authService.login(email,password);
    }
    else{
      authObs = this.authService.signup(email,password);
    }

    authObs
    .subscribe(respValue =>
      {
        console.log(respValue);
        this.isLoading=false;
        this.error=null;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage)
        this.isLoading=false;
        this.error = errorMessage
      })
    authForm.reset()
  }
}
