import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuardService } from './';

describe('AuthGuardService', () => {
	let service: AuthGuardService;
	const mockRouter = jasmine.createSpyObj([ 'navigate' ]);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: Router,
					useValue: mockRouter
				}
			]
		});

		service = TestBed.get(AuthGuardService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('canActivate', () => {
		it('should return true when a token exists in the localstorage', () => {
			spyOn(localStorage, 'getItem').and.returnValue('123');

			const actual = service.canActivate();

			expect(actual).toBeTruthy();
		});

		it('should return false and navigate to login when a token does not exist in the local storage', () => {
			spyOn(localStorage, 'getItem').and.returnValue(null);

			const actual = service.canActivate();

			expect(actual).toBeFalsy();
			expect(mockRouter.navigate).toHaveBeenCalledWith([ 'login' ]);
		});
	});
});
