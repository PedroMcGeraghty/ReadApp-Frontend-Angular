import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncabezadoComponent } from '../shared/encabezado/encabezado.component';
import { InputComponent } from '../input/input.component';
import { ServiceUser } from '../../service/service-user.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { NewAccountFormComponent } from "../forms/new-account-form/new-account-form.component";
import { LoginRequest } from '../../domain/types';
import { CommonForm } from '../../domain/forms';
import { PasswordRecoveryFormComponent } from '../forms/password-recovery-form/password-recovery-form.component';

import { BgColorDirective } from '../shared/directives/bg-color.directive';
import { ToastService } from '../../service/toast.service';
import { NavigationService } from '../../service/navigation.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EncabezadoComponent, InputComponent, FormsModule, NgIf, ReactiveFormsModule, NewAccountFormComponent, NgClass, PasswordRecoveryFormComponent, BgColorDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends CommonForm{
  override formLabels = {
    username:'username',
    password:'password',
  }

  formRestrictions = FORM_RECTRICTIONS
  constructor(
    private rt:Router,
    private service:ServiceUser,
    private fb:FormBuilder,
    private toast:ToastService,
    private nvService:NavigationService
  ){
    
    super(rt,service,fb, toast);
    this.form = this.fb.group({
      [this.formLabels.username]: ['', [Validators.required, Validators.maxLength(this.formRestrictions.USERNAME_MAX)]],
      [this.formLabels.password]: ['', [Validators.required, , Validators.maxLength(this.formRestrictions.PASSWORD_MAX)]],
    })
  }

  formType:FormType = FormType.LOG_IN



  override async request(){
    try {
      const request = this.buildLoginRequest()
      const response = await this.service.login(request)
      this.logUser(response.userID)
    }
    catch (error: any) {
      this.httpErrorHandler(error)
    }
  }

  changeToLogin(){
    this.formType = FormType.LOG_IN
  }
  changeToCreateAccount(){
    this.formType = FormType.NEW_ACCOUNT
  }
  changeToPasswordRecovery(){
    this.formType = FormType.PASSWORD_RECOVERY
  }
  showFormLogin():boolean {
    return this.formType == FormType.LOG_IN
  }
  showFormCreateAccount() {
    return this.formType == FormType.NEW_ACCOUNT
  }
  showFormPasswordRecovery() {
    return this.formType == FormType.PASSWORD_RECOVERY
  }

  buildLoginRequest():LoginRequest{
    return {
      username:this.getFormValue(this.formLabels.username),
      password:this.getFormValue(this.formLabels.password)
    }
  }
  private logUser(userID:number){
    localStorage.setItem('id', userID.toString());
    this.toast.showToast('Bienvenido', 'success'); 
    this.nvService.goTo('home')
  }

  buttonsColor(){
    return {
      request:'green',
      newAccount:'blue',
      passwordRecovery:'red'
    }
  }
}



export enum FormType{
  LOG_IN,
  NEW_ACCOUNT,
  PASSWORD_RECOVERY
}

enum FORM_RECTRICTIONS{
  USERNAME_MAX = 8,
  PASSWORD_MAX = 16
}
