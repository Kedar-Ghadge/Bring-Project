import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceHolder } from 'src/app/shared/placeHolder/placeHolder';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error = null;
  @ViewChild(PlaceHolder) alertHost : PlaceHolder
  alertSubscription : Subscription

  constructor(private authService:AuthService, private router: Router, private componentFactoryResolver : ComponentFactoryResolver) {

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
        this.showErrorAlert(errorMessage)
      })
    authForm.reset()
  }

  closeThis()
  {
    this.error=null;
  }

  showErrorAlert(errorMsg: string)
  {
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = errorMsg
    this.alertSubscription = componentRef.instance.close.subscribe(() =>{
      this.alertSubscription.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy() {
    if(this.alertSubscription)
    {
      this.alertSubscription.unsubscribe();
    }
  }
}
