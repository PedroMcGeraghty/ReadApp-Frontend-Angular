import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ServiceUser } from "../service/service-user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "../service/toast.service";

export abstract class CommonForm {
    constructor(
        private router: Router,
        private serviceUser: ServiceUser,
        private formBuilder: FormBuilder,
        private toastAlert: ToastService
    ) {

    }
    form!: FormGroup
    formLabels!: { [key: string]: string };
    getFormValue(label: string) {
        return this.form.get(label)?.value
    }
    warning(label: string) {
        return this.formInvalid(label) && this.formTouchedDirty(label)
    }
    formInvalid(label: string): boolean {
        return this.form.controls[label].invalid
    }
    formTouchedDirty(label: string): boolean {
        return (this.form.controls[label].touched || this.form.controls[label].dirty)
    }

    async request(){}

    httpErrorHandler(error:HttpErrorResponse){
        if(error.error['status']==null){
            this.toastAlert.showToast('Serivor caido :,(. Intente mas tarde', 'error')
        }
        
        if(error.error['status']==200){
            this.toastAlert.showToast(`${error.error['message']}`, 'success')
            
        }

        if(error.error['status']==400){
            this.toastAlert.showToast(`${error.error['message']}`, 'warning')
        }

        if(error.error['status']==404){
            this.toastAlert.showToast(`${error.error['message']}`, 'warning')
        }
    }
}