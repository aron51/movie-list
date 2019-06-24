import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';

import { AuthService, DataService } from './';
import { Role } from '../enums';

describe('AuthService', () => {
	let service: AuthService;
	let mockDataService = jasmine.createSpyObj([ 'getUsers' ]);
	let mockRouter = jasmine.createSpyObj([ 'navigate' ]);
	const user = { id: 1, email: 'test@test.com', password: '123', role: Role.user, name: 'Test User' };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: DataService,
					useValue: mockDataService
				},
				{
					provide: Router,
					useValue: mockRouter
				}
			]
		});

		service = TestBed.get(AuthService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getUserName', () => {
		it('should read the usrname from the localstorage', () => {
			spyOn(localStorage, 'getItem').and.returnValue('username');

			const actual = service.getUserName();

			expect(actual).toBe('username');
		});
	});

	describe('logout', () => {
		it('should clear the localstorage and navigate to the login page', () => {
			spyOn(localStorage, 'clear');

			service.logout();

			expect(localStorage.clear).toHaveBeenCalled();
			expect(mockRouter.navigate).toHaveBeenCalledWith([ 'login' ]);
		});
	});

	describe('login', () => {
		it('should return null when the user not exists', () => {
			mockDataService.getUsers.and.returnValue(of([]));

			service.login({ email: 'test@test.com', password: '123' }).subscribe((data) => {
				expect(data).toBeFalsy();
			});
		});

		it('should return null when the user password is wrong', () => {
			mockDataService.getUsers.and.returnValue(of([ user ]));

			service.login({ email: 'test@test.com', password: '1' }).subscribe((data) => {
				expect(data).toBeFalsy();
			});
		});

		it('should return null when the user role is not admin', () => {
			mockDataService.getUsers.and.returnValue(of([ user ]));

			service.login({ email: 'test@test.com', password: '123' }).subscribe((data) => {
				expect(data).toBeFalsy();
			});
		});

		it('should return the user when', () => {
			const admin = { ...user, role: Role.admin };
			mockDataService.getUsers.and.returnValue(of([ admin ]));

			service.login({ email: 'test@test.com', password: '123' }).subscribe((data) => {
				expect(data).toEqual(admin);
			});
		});
	});
});
