import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Guard for protecting the routes.
 *
 * @export
 * @class AuthGuardService
 * @implements {CanActivate}
 */
@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
	/**
	 * Creates an instance of AuthGuardService.
	 * 
	 * @param {Router} router
	 * @memberof AuthGuardService
	 */
	constructor(private router: Router) {}

	/**
	 * Checks if there is a token in the local storage,
	 * if it exists then it lets the navigation to happen,
	 * otherwise it redirects to the login page.
	 *
	 * @returns {boolean}
	 * @memberof AuthGuardService
	 */
	public canActivate(): boolean {
		if (localStorage.getItem('token') === null) {
			this.router.navigate([ 'login' ]);
			return false;
		}
		return true;
	}
}
