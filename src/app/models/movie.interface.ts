/**
 * Model for a movie entity.
 *
 * @export
 * @interface Movie
 */
export interface Movie {
	/**
	 * Description
	 *
	 * @type {string}
	 * @memberof Movie
	 */
	description: string;

	/**
	 * The movies id.
	 *
	 * @type {number}
	 * @memberof Movie
	 */
	id: number;

	/**
	 * Genre
	 *
	 * @type {string}
	 * @memberof Movie
	 */
	genre: string;

	/**
	 * Poster URL
	 *
	 * @type {string}
	 * @memberof Movie
	 */
	poster: string;

	/**
	 * Title
	 *
	 * @type {string}
	 * @memberof Movie
	 */
	title: string;

	/**
	 * Release year
	 *
	 * @type {number}
	 * @memberof Movie
	 */
	year: number;
}
