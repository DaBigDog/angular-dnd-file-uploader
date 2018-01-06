import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ConfirmModalMessageModel } from '../models/confirm-modal-message.model'

declare var $: any; // <-- don't look at his or your eyes will be burned! 

/**
 *  Note: DO NOT put this in a collapsible panel. It will not show if the panel is collapsed (hidden content)!
 */
@Component({
    selector: 'confirm-modal',
    template: `<div class="modal fade" id="{{modalId}}" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{modalTitle}}</h4>
                </div>
                <div class="modal-body">
                    {{ modalMessage }}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="confirm()">Yes</button>
                    <button type= "button" class="btn btn-primary" data-dismiss="modal" (click)="deny()">No</button>
                </div>
            </div>
        </div>
    </div>`
})

    /****  Example  *****
    *   one component on page:
    *       <confirm-modal [showModal]="sendModalMessage" (response)="responseConfirmed($event)"></confirm-modal>
    *   multiple components on page: must set unique modalId
    *       <confirm-modal  modalId="confirm-delete" [showModal]="sendModalMessage" (response)="responseConfirmed($event)"></confirm-modal>
    *********************/

export class ConfirmModal {

    private unsubscribe: Subject<void> = new Subject<void>();

    private confirmMessage: ConfirmModalMessageModel;

    // get a message from the parent component to show modal...
    @Input() private showModal: Subject<ConfirmModalMessageModel> = new Subject<ConfirmModalMessageModel>();
    @Input() private modalId: string = "confirmModal"; // you must pass in different modalId's if more than one used on a page

    // notify parent component when user makes choice...
    @Output() private response: EventEmitter<ConfirmModalMessageModel> = new EventEmitter<ConfirmModalMessageModel>();

    private readonly showAction: string = "show";
    private readonly hideAction: string = "hide";

    constructor() { }

    ngOnInit() {
        this.showModal.subscribe((x: ConfirmModalMessageModel) => {
            if (undefined !== x && null !== x) {
                this.confirmMessage = x;
                this.modalDisplay(this.showAction);
            }
        });
    }

    ngOnDestroy() {
        this.showModal.unsubscribe();
    }


    private modalDisplay(action: string): void {
        $("#" + this.modalId).modal(action);
    }

    private deny(): void {
        this.confirmMessage.responseValue = false;
        this.response.next(this.confirmMessage);
    }

    private confirm(): void {
        this.confirmMessage.responseValue = true;
        this.response.next(this.confirmMessage);
    }


    private get modalTitle(): string {
        let t: string = "Confirm";
        if (undefined !== this.confirmMessage && null !== this.confirmMessage) {
            if (undefined !== this.confirmMessage.modalTitle && null !== this.confirmMessage.modalTitle) {
                t = this.confirmMessage.modalTitle;
            }
        }
        return t;
    }

    private get modalMessage(): string {
        let msg: string = "Are you sure?";
        if (undefined !== this.confirmMessage && null !== this.confirmMessage) {
            if (undefined !== this.confirmMessage.modalMessage && null !== this.confirmMessage.modalMessage) {
                msg = this.confirmMessage.modalMessage;
            }
        }
        return msg;
    }
}
