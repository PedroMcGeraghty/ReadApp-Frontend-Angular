import { Component } from '@angular/core';
import { PanelPerfilComponent } from "../panel-perfil/panel-perfil.component";
import { BtnGuardarCancelarComponent } from "../shared/btn-guardar-cancelar/btn-guardar-cancelar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [HeaderComponent, PanelPerfilComponent, BtnGuardarCancelarComponent, RouterOutlet],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})

export class MiPerfilComponent {

}
