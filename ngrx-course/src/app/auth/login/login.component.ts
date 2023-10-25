import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";

import { Store } from '@ngrx/store';

import { AuthService } from "../auth.service";
import { AppState } from '../../reducers';
import { AuthActions } from '../action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private appStore: Store<AppState>
  ) {
    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  login(): void {
    const formValue = this.form.value;

    this.auth.login(formValue.email, formValue.password)
      .pipe(
        tap(user => {
          console.log(`user`, user);

          this.appStore.dispatch(
            AuthActions.login({ user })
          );

          this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login has failed.')
      );
  }

}
