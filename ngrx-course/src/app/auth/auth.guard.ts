import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";

import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";

@Injectable()
export class AuthGuard {

  constructor(private store: Store<AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store
      .pipe(
        select(isLoggedIn),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }
        })
      );
  }
}