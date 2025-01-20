import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.css'
})
export class InputBoxComponent {
  @Input() inputType:string = 'radiobox-input';
  @Input() label:string = '';
  @Input() name:string = '';
  @Input() isChecked:boolean = false;
}



