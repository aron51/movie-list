import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	const mockAuthService = jasmine.createSpyObj([ 'login' ]);

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ LoginComponent ],
				imports: [ ReactiveFormsModule, NoopAnimationsModule ],
				providers: [
					{
						provide: AuthService,
						useValue: mockAuthService
					}
				],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onLogin', () => {
		it('should hide the error message and call next on the login subject', () => {
			const spy = spyOn(component['login'], 'next').and.stub();
			component.onLogin();

			expect(component.displayError).toBeFalsy();
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('animationEnd', () => {
		it('should display the error and reset the animation state', () => {
			component.animationState = true;
			component.animationEnd();

			expect(component.animationState).toBeFalsy();
			expect(component.displayError).toBeTruthy();
		});
	});

	describe('ngOnInit', () => {
		it(
			'should set the animationState to true',
			fakeAsync(() => {
				mockAuthService.login.and.returnValue(of(null));

				component.ngOnInit();

				component.onLogin();

				tick();

				expect(component.animationState).toBeTruthy();
			})
		);

		it(
			'should set the animationState to false',
			fakeAsync(() => {
				mockAuthService.login.and.returnValue(of({}));

				component.ngOnInit();

				component.onLogin();

				tick();

				expect(component.animationState).toBeFalsy();
			})
		);
	});

	describe('ngOnDestroy', () => {
		it('should call next on the destroy subject', () => {
			const spy = spyOn(component['destroy'], 'next').and.stub();
			component.ngOnDestroy();

			expect(spy).toHaveBeenCalled();
		});
	});
});
