import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DataService } from './data.service';
import { Role } from '../enums';
import { User } from '../models';

/**
 * Handles the authentication logic
 *
 * @export
 * @class AuthService
 */
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	/**
	 * Creates an instance of AuthService.
	 *
	 * @param {DataService} dataService
	 * @param {Router} router
	 * @memberof AuthService
	 */
	constructor(private dataService: DataService, private router: Router) {}

	/**
	 * Returns the name from the local storage.
	 *
	 * @returns {string}
	 * @memberof AuthService
	 */
	public getUserName(): string {
		return localStorage.getItem('name');
	}

	/**
	 * Reads the users from the data service, if the user exists and the credentials are correct
	 * and also the user's role is admin, then it sets the user info in the local storage, and navigates
	 * to the dashboard. Otherwise, it returns null.
	 *
	 * @param {{ email: string; password: string }} payload
	 * @returns {Observable<User>}
	 * @memberof AuthService
	 */
	public login(payload: { email: string; password: string }): Observable<User> {
		return this.dataService.getUsers().pipe(
			map((users) => users.find((user) => user.email === payload.email)),
			map((user) => (user && user.password === payload.password && user.role === Role.admin ? user : null)),
			tap((user) => {
				if (user) {
					localStorage.setItem('token', Date.now().toLocaleString());
					localStorage.setItem('name', user.name);
					this.router.navigate([ 'dashboard' ]);
				}
			})
		);
	}

	/**
	 * Clears the storage, and navigates to the login page.
	 *
	 * @memberof AuthService
	 */
	public logout(): void {
		localStorage.clear();
		this.router.navigate([ 'login' ]);
	}
}
