import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Movie } from '../../models';
import { AuthService, DataService } from '../../services';

/**
 * Dashboard component. Contains the header and the movie list.
 *
 * @export
 * @class DashboardComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.scss' ],
	animations: [
		trigger('items', [
			transition(':enter', [
				style({ transform: 'scale(0.5)', opacity: 0 }),
				animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 }))
			])
		])
	]
})
export class DashboardComponent implements OnInit {
	/**
	 * The active sort value.
	 *
	 * @type {string}
	 * @memberof DashboardComponent
	 */
	public activeSort: string;

	/**
	 * The default sort value. Title on init.
	 *
	 * @memberof DashboardComponent
	 */
	public defaultSort = 'title';

	/**
	 * The sorted movie list that is displayed in the template.
	 *
	 * @type {Observable<Movie[]>}
	 * @memberof DashboardComponent
	 */
	public movieCollection$: Observable<Movie[]>;


	/**
	 * The received movie list.
	 *
	 * @private
	 * @type {Observable<Movie[]>}
	 * @memberof DashboardComponent
	 */
	private movies$: Observable<Movie[]>;


	/**
	 * Subject for reacting the sort change events.
	 *
	 * @private
	 * @type {BehaviorSubject<string>}
	 * @memberof DashboardComponent
	 */
	private sort: BehaviorSubject<string>;


	/**
	 * Creates an instance of DashboardComponent.
	 * 
	 * @param {AuthService} authService
	 * @param {DataService} dataService
	 * @memberof DashboardComponent
	 */
	constructor(private authService: AuthService, private dataService: DataService) {
		this.sort = new BehaviorSubject(this.defaultSort);
	}

	/**
	 * Reads the movies and sets up the observable chain for the displayed movie list.§
	 *
	 * @memberof DashboardComponent
	 */
	public ngOnInit(): void {
		this.movies$ = this.dataService.getMovies();

		this.movieCollection$ = combineLatest(this.sort, this.movies$).pipe(
			map(([ sortBy, list ]) => list.sort((a, b) => this.sortMovies(a, b, sortBy)))
		);
	}

	/**
	 * Getter for the user name.
	 *
	 * @readonly
	 * @type {string}
	 * @memberof DashboardComponent
	 */
	get user(): string {
		return this.authService.getUserName();
	}

	/** 
	 * Handler for the logout event. It calls the authService logout method for logging out.§
	 *
	 * @memberof DashboardComponent
	 */
	public onLogout(): void {
		this.authService.logout();
	}

	/**
	 * Reacting to the sort change event.
	 *
	 * @param {string} sortBy
	 * @memberof DashboardComponent
	 */
	public onSortByChange(sortBy: string): void {
		this.sort.next(sortBy);
	}

	/**
	 * Track by function used to optimize list rendering and reordering in Angular.
	 *
	 * @param {number} index
	 * @param {Movie} item
	 * @returns {number}
	 * @memberof DashboardComponent
	 */
	public trackByFn(index: number, item: Movie): number {
		return item.id;
	}

	/**
	 * Helper method for the sort.
	 *
	 * @private
	 * @param {Movie} a
	 * @param {Movie} b
	 * @param {string} sortBy
	 * @returns
	 * @memberof DashboardComponent
	 */
	private sortMovies(a: Movie, b: Movie, sortBy: string) {
		if (a[sortBy] < b[sortBy]) return -1;
		if (a[sortBy] > b[sortBy]) return 1;
		return 0;
	}

}
