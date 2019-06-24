import { Role } from 'app/enums';

/**
 *
 *
 * @export
 * @interface User
 */
export interface User {
	/**
	 * Email address
	 *
	 * @type {string}
	 * @memberof User
	 */
	email: string;

	/**
	 * ID
	 *
	 * @type {number}
	 * @memberof User
	 */
	id: number;

	/**
	 * Username
	 *
	 * @type {string}
	 * @memberof User
	 */
	name: string;

	/**
	 * Password
	 *
	 * @type {string}
	 * @memberof User
	 */
	password: string;

	/**
	 * User role
	 *
	 * @type {Role}
	 * @memberof User
	 */
	role: Role;
}
