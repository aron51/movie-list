import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { Role } from '../enums';

describe('DataService', () => {
	let service: DataService;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ DataService ],
			imports: [ HttpClientTestingModule ]
		});

		service = TestBed.get(DataService);
		httpTestingController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getUsers', () => {
		it('should return the users array', () => {
			const mockUsers = [
				{
					id: 1,
					name: 'Admin name',
					email: 'admin@admin.com',
					password: '1',
					role: Role.admin
				},
				{
					id: 2,
					name: 'User name',
					email: 'user@user.com',
					password: '1',
					role: Role.user
				}
			];

			service.getUsers().subscribe((data) => {
				expect(data).toEqual(mockUsers);
			});

			const req = httpTestingController.expectOne('assets/users.json');

			req.flush(mockUsers);
		});
	});

	describe('getMovies', () => {
		it('should return the users array', () => {
			const mockMovies = [
				{
					id: 3,
					title: 'Thor: Ragnarok',
					description:
						'Thor (Chris Hemsworth) is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela (Cate Blanchett).',
					genre: 'Action',
					year: 2017,
					poster: 'http://image.tmdb.org/t/p/w500//rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg'
				},
				{
					id: 4,
					title: 'Guardians of the Galaxy Vol. 2',
					description:
						"The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.",
					genre: 'Adventure',
					year: 2017,
					poster: 'http://image.tmdb.org/t/p/w500//y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg'
				}
			];

			service.getMovies().subscribe((data) => {
				expect(data).toEqual(mockMovies);
			});

			const req = httpTestingController.expectOne('assets/movies.json');

			req.flush(mockMovies);
		});
	});
});
