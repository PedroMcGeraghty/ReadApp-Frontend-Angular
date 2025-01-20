import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgColor]',
  standalone: true
})
export class BgColorDirective implements OnInit{

  // @Input() backgroundColor: string = '--color-header';
  @Input() appBgColor = '';
  @Input() colorByVariableName=false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {

    if (isPlatformBrowser(this.platformId) && this.colorByVariableName) {
      // Solo se ejecuta en el navegador
      const rootStyleVariable = getComputedStyle(document.documentElement).getPropertyValue(this.appBgColor);

      this.renderer.setStyle(this.el.nativeElement, 'background-color', rootStyleVariable);
    }else{
      this.el.nativeElement.style.backgroundColor = this.appBgColor
    }

  }
}

