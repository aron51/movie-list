import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Movie, User } from '../models';

/**
 * Handles the http calls.
 *
 * @export
 * @class DataService
 */
@Injectable({
	providedIn: 'root'
})
export class DataService {
	/**
	 * Base url for the http requests.
	 *
	 * @private
	 * @memberof DataService
	 */
	private baseUrl = 'assets';

	/**
	 * Creates an instance of DataService.
	 *
	 * @param {HttpClient} httpClient
	 * @memberof DataService
	 */
	constructor(private httpClient: HttpClient) {}

	/**
	 * Reads the movies json file, and returns the movie list observable.
	 *
	 * @returns {Observable<Movie[]>}
	 * @memberof DataService
	 */
	public getMovies(): Observable<Movie[]> {
		return this.httpClient.get<Movie[]>(`${this.baseUrl}/movies.json`);
	}

	/**
	 * Reads the movies json file, and returns the movie list observable.
	 *
	 * @returns {Observable<User[]>}
	 * @memberof DataService
	 */
	public getUsers(): Observable<User[]> {
		return this.httpClient.get<User[]>(`${this.baseUrl}/users.json`);
	}
}
