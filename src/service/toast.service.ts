import { Injectable, ApplicationRef, Renderer2, RendererFactory2, ComponentRef } from '@angular/core';
import { ToastComponent, ToastType } from '../app/shared/toast/toast.component';
import { HttpErrorResponse } from '@angular/common/http';
HttpErrorResponse

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private renderer: Renderer2;

  constructor(
    private appRef: ApplicationRef,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  showToast(message: string, customClass: ToastType) {
    const toastComponentRef = this.createToastComponent(message, customClass);
    const toastElement = (toastComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    this.renderer.appendChild(document.body, toastElement);

    setTimeout(() => {
      this.destroyToast(toastComponentRef);
    }, 5000);
  }

  private createToastComponent(message: string, type: ToastType): ComponentRef<ToastComponent> {
    const componentRef = this.appRef.bootstrap(ToastComponent, document.createElement('div'));
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    return componentRef;
  }

  private destroyToast(componentRef: ComponentRef<ToastComponent>) {
    this.renderer.removeChild(document.body, componentRef.location.nativeElement);
    componentRef.destroy();
  }
}
