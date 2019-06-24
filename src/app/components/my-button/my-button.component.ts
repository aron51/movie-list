import { Component, Input } from '@angular/core';

/**
 * Custom styled button component.
 *
 * @export
 * @class MyButtonComponent
 */
@Component({
	selector: 'my-button',
	templateUrl: './my-button.component.html',
	styleUrls: [ './my-button.component.scss' ]
})
export class MyButtonComponent {
	/**
	 * Disabled status for the button, false by default.
	 *
	 * @memberof MyButtonComponent
	 */
	@Input() disabled = false;

	/**
	 * The displayed label.
	 *
	 * @type {string}
	 * @memberof MyButtonComponent
	 */
	@Input() label: string;

	/**
	 * Creates an instance of MyButtonComponent.
	 *
	 * @memberof MyButtonComponent
	 */
	constructor() {}
}
