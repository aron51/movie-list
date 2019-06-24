import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;

    component.movie = {
      "id": 3,
      "title": "Thor: Ragnarok",
      "description": "Thor (Chris Hemsworth) is imprisoned on the planet Sakaar, and must race against time to return to Asgard and stop Ragnarök, the destruction of his world, at the hands of the powerful and ruthless villain Hela (Cate Blanchett).",
      "genre": "Action",
      "year": 2017,
      "poster": "http://image.tmdb.org/t/p/w500//rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg"
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
