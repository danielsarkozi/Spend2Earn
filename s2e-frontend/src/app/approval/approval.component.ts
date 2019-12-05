import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { UserService } from "../services/user.service";

@Component({
    selector: "Approval",
    templateUrl: "./approval.component.html"
})
export class ApprovalComponent implements OnInit {
    private pin: string = '';

    constructor(private params: ModalDialogParams, private userService: UserService) { }

    ngOnInit() {
        //alert(this.params.context.cardNumber);
    }

    private async onDeny() {
        const { transactionId } = this.params.context;
        if(transactionId) {
            const response = await this.userService.denyTransaction(`https://spend2earn.herokuapp.com/transactions/${transactionId}/`, this.pin);
            console.log(response);
        }
        else {
            console.log('Transaction ID missing');
        }
        this.params.closeCallback(false);
    }

    private async onApprove() {
        const { transactionId } = this.params.context;
        if(transactionId) {
            const response = this.userService.approveTransaction(`https://spend2earn.herokuapp.com/transactions/${transactionId}/`, this.pin);
            console.log(response);
        }
        else {
            console.log('Transaction ID missing');
        }
        this.params.closeCallback(true);
    }
}
