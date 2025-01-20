import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}


  goTo(option: string) {

    this.router.navigate([option]);

  }
  
}
