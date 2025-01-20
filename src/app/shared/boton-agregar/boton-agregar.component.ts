import { CommonModule } from '@angular/common';
import { Component, Input, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../service/book.service';

@Component({
  selector: 'app-boton-agregar',
  standalone: true,
  imports: [],
  templateUrl: './boton-agregar.component.html',
  styleUrl: './boton-agregar.component.css'
})
export class BotonAgregarComponent {

  constructor(private route: ActivatedRoute, private router: Router, public bookService: BookService) { }
  @Input() tipo: string = '';
  @Input() view: string = '';
  
  agregar() {
    this.router.navigate([this.view, this.tipo]);
  }
}
