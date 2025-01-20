import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewAccountRequest } from '../../../domain/types';
import { Router } from '@angular/router';
import { ServiceUser } from '../../../service/service-user.service';
import { CommonForm } from '../../../domain/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BgColorDirective } from '../../shared/directives/bg-color.directive';
import { ToastService } from '../../../service/toast.service';

@Component({
  selector: 'app-new-account-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule, NgFor, NgClass, BgColorDirective],
  templateUrl: './new-account-form.component.html',
  styleUrl: './new-account-form.component.css'
})
export class NewAccountFormComponent extends CommonForm{
  override formLabels = {
    email:'email',
    username:'username',
    password:'password',
    name:'name',
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
      [this.formLabels.password]: ['', [Validators.required, Validators.maxLength(this.formRestrictions.PASSWORD_MAX)]],
      [this.formLabels.name]: ['', [Validators.required]]
    })
  }
  override async request(){
    try {
      const request = this.buildNewAccountRequest()
      const response = await this.service.newAccount(request)
      this.toast.showToast(`${response}`, 'success')
    }
    catch (error: any) {
      this.httpErrorHandler(error)
    }
  }

  buildNewAccountRequest():NewAccountRequest{
    return {
      email:this.getFormValue(this.formLabels.email),
      username:this.getFormValue(this.formLabels.username),
      password:this.getFormValue(this.formLabels.password),
      name:this.getFormValue(this.formLabels.name),
    }
  }
}

enum FORM_RECTRICTIONS{
  USERNAME_MAX = 8,
  PASSWORD_MAX = 16
}
