import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function characterValidator(expression: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null;
        const allowed = expression.test(control.value);
        return allowed ? null : { invalidCharacters: { value: control.value } };
    };
}