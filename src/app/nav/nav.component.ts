import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Output() newFilterEvent = new EventEmitter<string>();
  privateOnly: boolean = false
  addFiltro(value: string) {
    this.newFilterEvent.emit(value);
  }

  constructor(private router: Router) { }

  checkHabilitado(): boolean {
    return (this.router.url == '/home/myRecommendations/true' || this.router.url == '/home/myRecommendations/false');
  }

  togglePrivateOnly(): void {

    this.privateOnly = !this.privateOnly;

    this.router.navigate([`/home/myRecommendations/${this.privateOnly}`]);

  }

}
