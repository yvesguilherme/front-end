import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStore } from './services/stores/auth.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authStore: AuthStore,
    private router: Router,
  ) { }

  logout() {
    this.authStore.logout();
    this.router.navigate(['/login']);
  }

}
