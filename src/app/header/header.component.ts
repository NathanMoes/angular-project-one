import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private authSub: Subscription;

  constructor(
    private dataService: DataStorageService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.authSub = this.auth.user.subscribe((user) => {
      this.isAuth = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onSave() {
    this.dataService.storeRecipes();
  }

  onFetch() {
    this.dataService.getRecipes().subscribe((data) => {});
  }

  onLogout() {
    this.auth.logout();
  }
}
