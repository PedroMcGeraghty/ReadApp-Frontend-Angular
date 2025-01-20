// Acorde a la documentacion de angular 18
//  https://angular.dev/guide/testing/attribute-directives


// "Class-only tests might be helpful, but attribute directives like this one tend to manipulate the DOM. Isolated unit tests don't touch the DOM and, therefore, do not inspire confidence in the directive's efficacy. A better solution is to create an artificial test component that demonstrates all ways to apply the directive."

import { Component } from "@angular/core";
import { HoverBoxshadowDirective } from "./hover-boxshadow.directive";

@Component({
  standalone: true,
  template: ` <h2 highlight="yellow">Something Yellow</h2>
    <h2 highlight>The Default (Gray)</h2>
    <h2>No Highlight</h2>
    <input #box [highlight]="box.value" value="cyan" />`,
  imports: [HoverBoxshadowDirective],
})
class TestComponent {}
