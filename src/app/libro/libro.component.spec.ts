import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroComponent } from './libro.component';
import { Book } from '../../domain/book';

describe('LibroComponent', () => {
  let component: LibroComponent;
  let fixture: ComponentFixture<LibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibroComponent);
    component = fixture.componentInstance;
    component.book = new Book()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
