import { ValidatorFn } from "@angular/forms";

export function numberValidator(numberRe: RegExp): ValidatorFn {
  return (control: { value: string; }) => {
    const numberValue = parseFloat(control.value);
    const isValidNumber = !isNaN(numberValue) && numberRe.test(control.value) && numberValue >= 0;

    return isValidNumber ? null : { 'Needs to be a number greater than zero': { value: control.value } };
  };
}
