  import { Component } from '@angular/core';
  import { EncabezadoComponent } from '../encabezado/encabezado.component';
  import { ShorcutMyProfileComponent } from '../shorcut-my-profile/shorcut-my-profile.component';

  import { ServiceUser } from '../../../service/service-user.service';
  import { UserBasic } from '../../../domain/tmpUser';
  import { HttpErrorResponse } from '@angular/common/http';




  @Component({
    selector: 'app-header',
    standalone: true,
    imports: [EncabezadoComponent , ShorcutMyProfileComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
  })
  export class HeaderComponent {
    user:UserBasic = new UserBasic();
    constructor(
      private userService:ServiceUser
    ){}
    
    async ngOnInit() {
      //SI EL ID INGRESADO PARA LA PETICION GET DEL SERVICE NO ES VALIDO, ATRAPA LA EXCEPCION
      //PERMITE MOSTRAR ERRORES AL USUARIO E INCLUSO 
      try{
        const usuarioLogueadoID = Number(localStorage.getItem('id'))
        this.user = await this.userService.getUserBasicByID(usuarioLogueadoID)
      }
      catch(error:any){
        if(error instanceof HttpErrorResponse){
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


