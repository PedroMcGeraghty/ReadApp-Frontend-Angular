import { Component, HostBinding } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resena',
  standalone: true,
  imports: [NgIf],
  templateUrl: './resena.component.html',
  styleUrl: './resena.component.css'
})
export class ResenaComponent {
  @HostBinding('style.width') width: string = '100%';
  
  constructor(private router: Router) {}

}

