import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { DashboardComponent } from './dashboard.component';
import { AuthService, DataService } from '../../services';
import { MovieComponent } from '@components/movie';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	const mockAuthService = jasmine.createSpyObj([ 'logout', 'getUserName' ]);
	const mockDataService = jasmine.createSpyObj([ 'getMovies' ]);
	const mockMovies = [
				{
					id: 1,
					title: 'Avengers: Endgame',
					description: 
						'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
					genre: 'Action',
					year: 2019,
					poster: 'http://image.tmdb.org/t/p/w500//or06FN3Dka5tukK1e9sl16pB3iy.jpg'
				},
				{
					id: 3,
					title: 'Thor: Ragnarok',
					description:
						'Thor (Chris Hemsworth) is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela (Cate Blanchett).',
					genre: 'Action',
					year: 2017,
					poster: 'http://image.tmdb.org/t/p/w500//rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg'
				}
			];

	mockDataService.getMovies.and.returnValue(of(mockMovies))

	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ DashboardComponent, MovieComponent ],
				imports: [ NoopAnimationsModule ],
				providers: [
					{
						provide: AuthService,
						useValue: mockAuthService
					},
					{
						provide: DataService,
						useValue: mockDataService
					}
				],
				schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
  });
  
  describe('onLogout', () => {
	it('should call the authService logout method', () => {
			component.onLogout();

			expect(mockAuthService.logout).toHaveBeenCalled();
		});
  });

  describe('onSortByChange', () => {
		it('should call next on the onSortByChange subject', () => {
			const spy = spyOn(component['sort'], 'next').and.stub();
			component.onSortByChange('title');

			expect(spy).toHaveBeenCalled();
		});
  });
  
  describe('trackByFn', () => {
		it('should return the item id', () => {
			const movie = {
				'id': 3,
				'title': 'Thor: Ragnarok',
				'description': 'Description...',
				'genre': 'Action',
				'year': 2017,
				'poster': 'http://image.tmdb.org/t/p/w500//rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg'
			};

			const actual = component.trackByFn(3, movie);

			expect(actual).toBe(movie.id);
		});
	});

	describe('ngOnInit', () => {
		it('should emit the sorted movies based on the title', () => {
			component.ngOnInit();

			component.movieCollection$.subscribe(data => {
				expect(data[0].title).toBe(mockMovies[0].title);
				expect(data[1].title).toBe(mockMovies[1].title);
			})
		})

		it('should emit the sorted movies based on the genre', fakeAsync(() => {
			let actual;
			component.ngOnInit();

			component.onSortByChange('genre');

			tick();
		
			component.movieCollection$.pipe().subscribe(data => {
				actual = data;
			})


			expect(actual[0].title).toBe(mockMovies[0].title);
			expect(actual[1].title).toBe(mockMovies[1].title);
		}))

		it('should emit the sorted movies based on the year', fakeAsync(() => {
			let actual;
			component.ngOnInit();

			component.onSortByChange('year');

			tick();
		
			component.movieCollection$.pipe().subscribe(data => {
				actual = data;
			})


			expect(actual[0].title).toBe(mockMovies[0].title);
			expect(actual[1].title).toBe(mockMovies[1].title);
		}))
	});
});
