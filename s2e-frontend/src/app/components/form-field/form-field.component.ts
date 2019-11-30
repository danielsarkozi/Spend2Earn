import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'FormField',
    templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
    @Input() private label: string;
    @Input() private value: string;
    @Input() private validator: (value: string) => string;
    @Input() private className: string;

    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    private error: string;

    private onBlur(value: string): void {
        this.valueChange.emit(value);
        if(this.validator) {
            this.error = this.validator(value);
        }
    }
}
