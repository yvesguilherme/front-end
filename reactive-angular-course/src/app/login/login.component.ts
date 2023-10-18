import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthStore } from '../services/stores/auth.store';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authStore: AuthStore) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  login() {
    const val = this.form.value;

    this.authStore.login(val.email, val.password)
      .pipe(
        switchMap(() => this.router.navigateByUrl('/courses'))
      )
      .subscribe(
        () => { },
        error => alert(error)
      );
  }

}
