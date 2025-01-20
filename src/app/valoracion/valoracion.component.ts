import { Component, Input, OnInit } from '@angular/core';
import { BotonAgregarComponent } from '../shared/boton-agregar/boton-agregar.component';
import { ValoracionIndividualComponent } from "../valoracion-individual/valoracion-individual.component";
import { Valoration } from '../../domain/valoration';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BtnGuardarCancelarComponent } from "../shared/btn-guardar-cancelar/btn-guardar-cancelar.component";
import { RecommendationService } from '../../service/recommendation.service';
import { ServiceUser } from '../../service/service-user.service';
import { UserBasic } from '../../domain/tmpUser';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';


@Component({
  selector: 'app-valoracion',
  standalone: true,
  imports: [BotonAgregarComponent, ValoracionIndividualComponent, NgIf, FormsModule, BtnGuardarCancelarComponent, CommonModule],
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  @Input() valoraciones!: Array<Valoration>
  @Input() score!: number
  @Input() puedeValorar!: boolean
  @Input() id!: number

  user: UserBasic = new UserBasic()
  agregarValoracion: boolean = false
  rating = 0
  nuevaValoracion: Valoration = new Valoration(this.user.fotoPath, this.user.username, 0, new Date(1914, 14, 14), "") 

  constructor(private recommendationService: RecommendationService, private userService: ServiceUser, private toast: ToastService) {}

  async ngOnInit() {}

  setRating(valor: number) {
    this.rating = valor
  }
  async agregarLaValoracion() {
    if (this.validacion()) {
      this.toast.showToast("Por favor complete los campos vacios","warning");
      return;
    }
  
    this.nuevaValoracion.valor = this.rating;
    try{
      await this.recommendationService.agregarValoracion(this.nuevaValoracion, this.id);
      await this.cancelar();
      await this.toast.showToast("Se agregó correctamente la valoración", 'success');
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        this.toast.showToast(`${error.error['message']}`, 'warning');
        return error
      }
      this.toast.showToast("error externo", 'error');
      return error
    }
  
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  validacion = (): boolean => !this.nuevaValoracion.comentario.trim() || this.rating === 0

  agregaValoracion() {
    this.agregarValoracion = true
    this.puedeValorar = false
  }

  cancelar() {
    this.agregarValoracion = true
    this.nuevaValoracion.comentario = ""
    this.rating = 0
  }
}
