import { Component } from '@angular/core';
import { CommonForm } from '../../../domain/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordRecoveryRequest } from '../../../domain/types';
import { ServiceUser } from '../../../service/service-user.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { BgColorDirective } from '../../shared/directives/bg-color.directive';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-password-recovery-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, NgFor, NgClass, BgColorDirective],
  templateUrl: './password-recovery-form.component.html',
  styleUrl: './password-recovery-form.component.css'
})
export class PasswordRecoveryFormComponent extends CommonForm{
  override formLabels = {
    email:'email',
    username:'username',
    newPassword:'newPassword'
  }
  formRestrictions = FORM_RECTRICTIONS

  constructor(
    private rt:Router,
    private service:ServiceUser,
    private fb:FormBuilder,
    private toast:ToastService
  ){
    super(rt,service,fb, toast);
    this.form = this.fb.group({
      [this.formLabels.email]: ['', [Validators.required, Validators.email]],
      [this.formLabels.username]: ['', [Validators.required, Validators.maxLength(this.formRestrictions.USERNAME_MAX), Validators.pattern('^[a-zA-Z0-9]+$')]],
      [this.formLabels.newPassword]: ['', [Validators.required, Validators.maxLength(this.formRestrictions.PASSWORD_MAX), Validators.pattern('^[a-zA-Z0-9]+$')]]
    })
  }
  override async request(){
    try {
      const request = this.buildPasswordRecoveryRequest()
      const response = await this.service.passwordRecovery(request)
      this.toast.showToast(`${response.message}`, 'success'); 
    }
    catch (error: any) {
      this.httpErrorHandler(error)
    }
  }

  buildPasswordRecoveryRequest():PasswordRecoveryRequest{
    return {
      email:this.getFormValue(this.formLabels.email),
      username:this.getFormValue(this.formLabels.username),
      newPassword:this.getFormValue(this.formLabels.newPassword)
    }
  }
}

enum FORM_RECTRICTIONS{
  USERNAME_MAX = 8,
  PASSWORD_MAX = 16
}

