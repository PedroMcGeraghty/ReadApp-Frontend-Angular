import { Component } from '@angular/core';
import { RouterOutlet,Router } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'readapp-2024-grupo-9';
  constructor(private router: Router) {
  }

  isLoginPage(): boolean {
    return this.router.url === '/login'; 
  }
}

