import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub : Subscription
  isAuthenticated: boolean = false

  constructor(private dataStorageService:DataStorageService, private authService: AuthService) {}

  ngOnDestroy(){
    this.authService.user.unsubscribe()
  }

  ngOnInit() {
    this.authService.user.subscribe(userData =>
      {
        this.isAuthenticated = !!userData
      })
  }

  onSaveRecipes()
  {
    this.dataStorageService.saveRecipes();
  }

  onFetchRecipes()
  {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout()
  {
    this.authService.logout();
  }
}
