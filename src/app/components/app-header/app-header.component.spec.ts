import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
	let component: AppHeaderComponent;
	let fixture: ComponentFixture<AppHeaderComponent>;

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ AppHeaderComponent ],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AppHeaderComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('onChangeSortBy', () => {
		it('should change the active sort and emit an event', () => {
			spyOn(component.sortByChange, 'emit').and.stub();

			component.onChangeSortBy('genre');

			expect(component.activeSort).toBe('genre');
			expect(component.sortByChange.emit).toHaveBeenCalledWith('genre');
		});
	});

	describe('onLogout', () => {
		it('should emit a logout', () => {
			spyOn(component.logout, 'emit').and.stub();

			component.onLogout();

			expect(component.logout.emit).toHaveBeenCalled();
		});
	});
});
