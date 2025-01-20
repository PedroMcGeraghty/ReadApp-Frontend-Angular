import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ServiceUser } from '../../service/service-user.service';
import { UserAside, UserBasic } from '../../domain/tmpUser';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-panel-perfil',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './panel-perfil.component.html',
  styleUrl: './panel-perfil.component.css'
})
export class PanelPerfilComponent {

  myInfo: UserBasic = new UserBasic(0, "", "", "", "", "", 0, "") // inicializo vacio para que no tire error en la vista
  constructor(private router: Router, private route: ActivatedRoute, public userService: ServiceUser) { }


  goTo(option: Option) {
    this.router.navigate([option.path], { relativeTo: this.route });
  }

  opcionTitulos = ['Information', 'Friends', 'Books readed', 'Books to read', 'Recommendations to value']
  svgs = ['information.svg',
    'amigos.svg',
    'librosLeidos.svg',
    'librosALeer.svg',
    'recomendacionesAValorar.svg']
  colorDefault = ''
  colorSvg = ['#208544', '#203885', '#822085', '#33d2c8', 'ff0000']
  path = ['information', 'friends', 'books/readed', 'books/to-read', 'recommendations-to-value']

  options = this.opcionTitulos.map((titulo, i) => new Option(titulo, this.svgs[i], this.colorDefault, this.colorSvg[i], this.path[i]));

  async ngOnInit() {
    await this.getInfo()
  }

  async getInfo() {

    try {
      const usuarioLogueadoID = Number(localStorage.getItem('id'))
      this.myInfo = await this.userService.getUserBasicByID(usuarioLogueadoID);
    }
    catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        //Solo me interesa HttpErrorResponde
        console.log(error.error["timestamp"])
        console.log(error.error["status"])
        console.log(error.error["error"])
        console.log(error.error["message"])
        console.log(error.error["path"])
      }
    }
  }

}

export class Option {
  constructor(
    public label: string,
    public iconPath: string,
    public textColor: string,
    public iconColor: string,
    public path: string
  ) { }
}