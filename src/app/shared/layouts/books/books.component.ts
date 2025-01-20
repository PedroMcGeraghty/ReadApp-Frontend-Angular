import { Component } from '@angular/core';
import { LibroComponent } from '../../../libro/libro.component';

@Component({
  selector: 'app-container-books',
  standalone: true,
  imports: [LibroComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class ContainerBooksComponent {

}
