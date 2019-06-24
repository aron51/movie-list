import { animate, keyframes, style, transition, trigger,  } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';


import { AuthService } from './../../services/auth.service';

/**
 * Login component. Displays two inputs, and a Login button.
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ],
	animations: [
		trigger('fade', [
			transition(':enter', [ style({ opacity: 0 }), animate(500) ]),
			transition(':leave', animate(500, style({ opacity: 0 })))
		]),
		trigger('hasError', [
			transition(
				'false => true',
				animate(
					'1000ms ease-in',
					keyframes([
						style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.1 }),
						style({ transform: 'translate3d(2px, 0, 0)', offset: 0.2 }),
						style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.3 }),
						style({ transform: 'translate3d(4px, 0, 0)', offset: 0.4 }),
						style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.5 }),
						style({ transform: 'translate3d(4px, 0, 0)', offset: 0.6 }),
						style({ transform: 'translate3d(-4px, 0, 0)', offset: 0.7 }),
						style({ transform: 'translate3d(2px, 0, 0)', offset: 0.8 }),
						style({ transform: 'translate3d(-1px, 0, 0)', offset: 0.9 })
					])
				)
			)
		])
	]
})
export class LoginComponent implements OnInit, OnDestroy {
	/**
	 * Follows the animation state.
	 *
	 * @memberof LoginComponent
	 */
	public animationState = false;

	/**
	 * Decide if the error needs to be shown.
	 *
	 * @memberof LoginComponent
	 */
	public displayError = false;

	/**
	 * Form group for login.
	 *
	 * @type {FormGroup}
	 * @memberof LoginComponent
	 */
	public loginForm: FormGroup;

	/**
	 * Cleans up the subscriptuon.
	 *
	 * @private
	 * @type {Subject<any>}
	 * @memberof LoginComponent
	 */
	private destroy: Subject<any>;

	/**
	 * Reacting for the login button click.
	 *
	 * @private
	 * @type {Subject<any>}
	 * @memberof LoginComponent
	 */
	private login: Subject<any>;

	/**
	 * Creates an instance of LoginComponent.
	 * 
	 * @param {FormBuilder} formBuilder
	 * @param {AuthService} authService
	 * @memberof LoginComponent
	 */
	constructor(private formBuilder: FormBuilder, private authService: AuthService) {
		this.login = new Subject();
		this.destroy = new Subject();
	}

	/**
	 * Creates the login form, and the login subscription.
	 *
	 * @memberof LoginComponent
	 */
	public ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: this.formBuilder.control('', [ Validators.required, Validators.email ]),
			password: this.formBuilder.control('', [ Validators.required ])
		});

		this.login
			.pipe(switchMap(() => this.authService.login(this.loginForm.value)), takeUntil(this.destroy))
			.subscribe((data) => (this.animationState = data ? false : true));
	}

	/**
	 * Clean up the subscription.
	 *
	 * @memberof LoginComponent
	 */
	public ngOnDestroy(): void {
		this.destroy.next();
	}

	/**
	 * Resets the animation state.
	 *
	 * @memberof LoginComponent
	 */
	public animationEnd(): void {
		if (this.animationState) {
			this.animationState = false;
			this.displayError = true;
		}
	}

	/**
	 * Event handler for the login click.
	 *
	 * @memberof LoginComponent
	 */
	public onLogin(): void {
		this.displayError = false;
		this.login.next();
	}

}
