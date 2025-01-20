import { Component, Input } from '@angular/core';
import { Valoration } from '../../domain/valoration';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-valoracion-individual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './valoracion-individual.component.html',
  styleUrl: './valoracion-individual.component.css'
})
export class ValoracionIndividualComponent {
  @Input() valoracion!: Valoration


 
}
