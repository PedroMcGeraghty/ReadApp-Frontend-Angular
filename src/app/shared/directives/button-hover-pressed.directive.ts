import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appButtonHoverPressed]',
  standalone: true
})
export class ButtonHoverPressedDirective implements OnInit{

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 5px #57cc99');
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
    this.renderer.setStyle(this.el.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.el.nativeElement, 'border', 'none');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.press();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.unpress();
  }

  private press() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 3px #57cc99');
    this.renderer.setStyle(this.el.nativeElement, 'top', '1px');
  }
  private unpress() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 5px #57cc99');
    this.renderer.setStyle(this.el.nativeElement, 'top', '0px');
  }
}
