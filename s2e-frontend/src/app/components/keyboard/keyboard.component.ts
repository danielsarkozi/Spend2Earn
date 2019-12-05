import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: "Keyboard",
    templateUrl: "./keyboard.component.html",
    styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent {
    @Input() type: string;
    @Input() value: string;
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @Output() deny: EventEmitter<void> = new EventEmitter<void>();
    @Output() approve: EventEmitter<void> = new EventEmitter<void>();


    private awaitingPayment = false;

    input(symbol: string): void {
        if(this.value.length < 6) {
            this.value += symbol;
            this.valueChange.emit(this.value);
        }
    }

    onDelete(): void {
        this.value = this.value.substring(0, this.value.length - 1);
        this.valueChange.emit(this.value);
    }

    onDeny(): void {
        this.deny.emit();
    }

    isSymbolEnabled(symbol: string): boolean {
        return this.value.length < 6;
    }

    onApprove() {
        this.approve.emit();
    }

    floor(n: number): number {
        return Math.floor(n);
    }
}
