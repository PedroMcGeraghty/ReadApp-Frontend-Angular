import { Component, HostBinding } from '@angular/core';
import { InputBoxComponent } from "../input-box/input-box.component";
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../input/input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnGuardarCancelarComponent } from '../btn-guardar-cancelar/btn-guardar-cancelar.component';
import { ServiceUser } from '../../../service/service-user.service';
import { FormErrorComponent } from "../../perfil-info/form-error/form-error.component";
import { UserInformacion, PerfilDeLectura } from '../../../domain/tmpUser';
import { DateValidator, MinMaxValidator } from './validators';

import { Router } from '@angular/router';
import { ToastService } from '../../../service/toast.service';
import { HttpErrorResponse } from '@angular/common/http';




@Component({
  selector: 'app-perfil-info',
  standalone: true,
  imports: [InputBoxComponent, CommonModule, InputComponent, FormsModule, BtnGuardarCancelarComponent, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './perfil-info.component.html',
  styleUrl: './perfil-info.component.css'
})
export class PerfilInfoComponent {
  @HostBinding('style.width') width: string = '100%';

  /* Forms */
  perfilForm: FormGroup;
  calculadorForm: FormGroup;
  private chPermitidosNomb = '[a-zA-Z]*$';
  private chPermitidosUser = '^[a-zA-Z0-9]*$';

  /* Hacer aparecer botones de min y max cuando se presiona Calculador */
  mostrarBoton: boolean = false
  boton = new BtnGuardarCancelarComponent()


  /* Variables del Usuario */
  private userId!: number
  private userData!: UserInformacion
  criteriosBusqueda = ['Precavido', 'Demandante', 'Cambiante', 'Leedor', 'Nativista', 'Poliglota', 'Experimentado']
  formasDeLectura = ['Promedio', 'Ansioso', 'Fanatico', 'Recurrente']
  userLectura: Array<string> = []
  userBusqueda: Array<string> = []
  tiempoDeLectura: number = 0

  constructor(private fb: FormBuilder, private UserService: ServiceUser, private toastr: ToastService, private router: Router) {

    /* Armado de los formgroups con sus validators */
    this.perfilForm = this.fb.group({
      'nombre': ['', [Validators.required, Validators.pattern(this.chPermitidosNomb)]],
      'apellido': ['', [Validators.required, Validators.pattern(this.chPermitidosNomb)]],
      'username': ['', [Validators.required, Validators.pattern(this.chPermitidosUser)]],
      'fecha de nacimiento': ['', [Validators.required, DateValidator.LessThanToday]],
      'email': ['', [Validators.required, Validators.email]]
    })
    this.calculadorForm = this.fb.group({
      'numero min': [],
      'numero max': []
    })
    this.calculadorForm.setValidators(MinMaxValidator.LessThanMin())

  }

  /* Mensajes de error cuando falla el validator */
  errorMessage(form: FormGroup, campo: string, validator: string) {
    const campoForm = form.get(campo)
    const error = campoForm?.errors
    if (campoForm?.value == '') return 'este campo es obligatorio'
    if (validator == 'pattern' && error) return 'el campo contiene carácteres no permitidos'
    if (validator == 'email' && error) return 'dominio del correo incorrecto'
    if (validator == 'date validator' && error) return 'ingrese una fecha menor a hoy'
    if (validator == 'minmax' && error) return 'el valor minimo no puede superar al máximo o ser menos que 0'
    return undefined
  }

  mostrar() {
    this.mostrarBoton = !this.mostrarBoton
    this.resetCalculador() // Actualiza según si el checkbox está marcado o no
  }

  resetCalculador() {
    this.calculadorForm.reset()
  }

  estaEn(valor: string, lista: Array<string>) {
    const incluye = lista.includes(valor)
    if (valor == 'Calculador' && incluye) {
      this.mostrarBoton = true
    }
    return incluye
  }

  modificarBusqueda(valor: string, lista: Array<string>) {
    if (lista.includes(valor)) {
      const indice = lista.indexOf(valor)
      lista.splice(indice, 1)
    } else {
      lista.push(valor)
    }
  }

  modificarLectura(valor: string, lista: Array<string>) {
    lista.pop()
    lista.push(valor)
  }

  async ngOnInit() {
    try {
      this.userId = await this.UserService.getLoggedUser()
      this.userData = await this.UserService.getUserProfileByID(this.userId)
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.toastr.showToast("Error al recuperar la información del usuario", "error")
      } else {
        this.toastr.showToast("Reintente más tarde", "error")
      }
    }

    this.userBusqueda = this.obtenerPerfiles(this.userData.perfil!)
    this.userLectura.push(this.userData.tipoDeLector!)
    this.tiempoDeLectura = this.userData.tiempoLecturaPromedio!
    this.perfilForm.patchValue({
      'nombre': this.userData.nombre,
      'apellido': this.userData.apellido,
      'username': this.userData.username,
      'fecha de nacimiento': this.userData.fechaNacimiento,
      'email': this.userData.email
    })

    this.calculadorForm.patchValue({
      'numero min': this.obtenerRangoMin(this.userData.perfil!),
      'numero max': this.obtenerRangoMax(this.userData.perfil!)
    })

  }

  obtenerPerfiles(data: Array<PerfilDeLectura>) {
    return data.map(perfil => perfil.tipoPerfil)
  }

  obtenerRangoMin(listaPerfiles: Array<PerfilDeLectura>) {
    return listaPerfiles.filter(perfil => perfil.rangoMin != undefined)[0]?.rangoMin
  }

  obtenerRangoMax(listaPerfiles: Array<PerfilDeLectura>) {
    return listaPerfiles.filter(perfil => perfil.rangoMin != undefined)[0]?.rangoMax
  }

  toPerfilDeLectura(perfiles: Array<string>): Array<PerfilDeLectura> {
    return perfiles.map(perfil => {
      if (perfil == 'Calculador') {
        return new PerfilDeLectura(perfil, this.calculadorForm.get("numero min")?.value, this.calculadorForm.get("numero max")?.value)
      }
      return new PerfilDeLectura(perfil)
    })
  }

  getValueForm(campo: string, form: FormGroup) {
    const valor = form.get(campo)
    if (valor?.dirty) {
      return valor.value
    }
    return undefined
  }

  hayCriterioBusqueda(): boolean {
    return this.userBusqueda.length > 0
  }

  async guardar() {
    if (this.perfilForm.valid && (this.calculadorForm.valid || !this.mostrarBoton) && this.hayCriterioBusqueda()) {
      try {
        await this.UserService.actualizarInfoUsuario(new UserInformacion(
          this.userId,
          this.getValueForm("nombre", this.perfilForm),
          this.getValueForm("apellido", this.perfilForm),
          this.getValueForm("username", this.perfilForm),
          this.getValueForm("fecha de nacimiento", this.perfilForm),
          this.getValueForm("email", this.perfilForm),
          this.toPerfilDeLectura(this.userBusqueda),
          this.userLectura[0]
        )).then(() => this.toastr.showToast("Información actualizada correctamente", "success"))
      } catch (error) {
        this.toastr.showToast('Reintente más tarde', 'error')
      }
    }
    else {
      this.toastr.showToast('Algunos campos del formulario son inválidos', "error")
    }

  }

  cancelar() {
    this.router.navigate(['/home'])
  }



}




