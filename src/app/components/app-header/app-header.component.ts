import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Sticky app header, that contains the sort menu, 
 * and the user info with the logout button
 *
 * @export
 * @class AppHeaderComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'app-header',
	templateUrl: './app-header.component.html',
	styleUrls: [ './app-header.component.scss' ]
})
export class AppHeaderComponent implements OnInit {
	/**
	 * Default sort input.
	 *
	 * @type {string}
	 * @memberof AppHeaderComponent
	 */
	@Input() defaultSort: string;

	/**
	 * Username input.
	 *
	 * @type {string}
	 * @memberof AppHeaderComponent
	 */
	@Input() username: string;

	/**
	 * Event emitter for the logout event.
	 *
	 * @type {EventEmitter<any>}
	 * @memberof AppHeaderComponent
	 */
	@Output() logout: EventEmitter<any>;

	/**
	 * Event emitter for the sort change event.
	 *
	 * @type {EventEmitter<string>}
	 * @memberof AppHeaderComponent
	 */
	@Output() sortByChange: EventEmitter<string>;


	/**
	 * The currently active sort value.
	 *
	 * @type {string}
	 * @memberof AppHeaderComponent
	 */
	public activeSort: string;

	/**
	 * Creates an instance of AppHeaderComponent.
	 * 
	 * @memberof AppHeaderComponent
	 */
	constructor() {
		this.sortByChange = new EventEmitter();
		this.logout = new EventEmitter();
	}

	/**
	 * Sets the activeSort value based on the input.
	 *
	 * @memberof AppHeaderComponent
	 */
	public ngOnInit(): void {
		this.activeSort = this.defaultSort;
	}

	/**
	 * Changes the active sort value, and notifies the parent.
	 *
	 * @param {string} sortBy
	 * @memberof AppHeaderComponent
	 */
	public onChangeSortBy(sortBy: string): void {
		this.activeSort = sortBy;

		this.sortByChange.emit(this.activeSort);
	}

	/**
	 * Logout event handler. It delegates the event to the parent.
	 *
	 * @memberof AppHeaderComponent
	 */
	public onLogout(): void {
		this.logout.emit();
	}
}
