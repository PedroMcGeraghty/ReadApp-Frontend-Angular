import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverBoxshadow]',
  standalone: true
})
export class HoverBoxshadowDirective {
    constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Aplica el box-shadow al hacer hover (mouseenter)
  @HostListener('mouseenter') onMouseEnter() {
    this.applyBoxShadow();
  }

  // Remueve el box-shadow cuando el mouse deja el elemento (mouseleave)
  @HostListener('mouseleave') onMouseLeave() {
    this.removeBoxShadow();
  }

  // Método para aplicar una sombra fija
  private applyBoxShadow() {
    // Obtén el valor de la variable CSS desde el :root
    const boxShadowValue = getComputedStyle(document.documentElement).getPropertyValue('--shadow-elevation-high').trim();

    // Verifica si el valor no está vacío y aplícalo
    if (boxShadowValue) {
      this.renderer.setStyle(this.el.nativeElement, 'box-shadow', boxShadowValue);
    } else {
      console.warn('No se encontró el valor para la variable CSS --shadow-elevation-high');
    }
  }

  // Método para remover la sombra
  private removeBoxShadow() {
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}
