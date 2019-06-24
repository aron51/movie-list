import { Movie } from '@models/movie.interface';
import { Component, Input } from '@angular/core';

/**
 * Represents a movie item in the list.
 *
 * @export
 * @class MovieComponent
 */
@Component({
	selector: 'movie',
	templateUrl: './movie.component.html',
	styleUrls: [ './movie.component.scss' ]
})
export class MovieComponent {
	/**
	 * The given movie object.
	 *
	 * @type {Movie}
	 * @memberof MovieComponent
	 */
	@Input() movie: Movie;

	/**
	 * Creates an instance of MovieComponent.
	 *
	 * @memberof MovieComponent
	 */
	constructor() {}
}
