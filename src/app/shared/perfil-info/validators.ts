import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";


export class MinMaxValidator {

    static LessThanMin(): any {
        return (group: FormGroup) => {
            const minControl = group.get('numero min');
            const maxControl = group.get('numero max');

            let min: number = minControl?.value;
            let max: number = maxControl?.value;

            if (min > max || min <= 0) {
                maxControl?.setErrors({ "LessThanMin": true });
            }
            else {
                maxControl?.setErrors(null);
            }
        };
    }
}
export class DateValidator {

    static LessThanToday(control: FormControl): ValidationErrors | null {
        let hoy: Date = new Date();

        if (new Date(control.value) > hoy)
            return { "LessThanToday": true };

        return null;
    }
}

