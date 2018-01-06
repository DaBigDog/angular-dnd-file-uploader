"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
/**
 *  Note: DO NOT put this in a collapsible panel. It will not show if the panel is collapsed (hidden content)!
 */
var ConfirmModal = (function () {
    function ConfirmModal() {
        this.unsubscribe = new Subject_1.Subject();
        // get a message from the parent component to show modal...
        this.showModal = new Subject_1.Subject();
        this.modalId = "confirmModal"; // you must pass in different modalId's if more than one used on a page
        // notify parent component when user makes choice...
        this.response = new core_1.EventEmitter();
        this.showAction = "show";
        this.hideAction = "hide";
    }
    ConfirmModal.prototype.ngOnInit = function () {
        var _this = this;
        this.showModal.subscribe(function (x) {
            if (undefined !== x && null !== x) {
                _this.confirmMessage = x;
                _this.modalDisplay(_this.showAction);
            }
        });
    };
    ConfirmModal.prototype.ngOnDestroy = function () {
        this.showModal.unsubscribe();
    };
    ConfirmModal.prototype.modalDisplay = function (action) {
        $("#" + this.modalId).modal(action);
    };
    ConfirmModal.prototype.deny = function () {
        this.confirmMessage.responseValue = false;
        this.response.next(this.confirmMessage);
    };
    ConfirmModal.prototype.confirm = function () {
        this.confirmMessage.responseValue = true;
        this.response.next(this.confirmMessage);
    };
    Object.defineProperty(ConfirmModal.prototype, "modalTitle", {
        get: function () {
            var t = "Confirm";
            if (undefined !== this.confirmMessage && null !== this.confirmMessage) {
                if (undefined !== this.confirmMessage.modalTitle && null !== this.confirmMessage.modalTitle) {
                    t = this.confirmMessage.modalTitle;
                }
            }
            return t;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfirmModal.prototype, "modalMessage", {
        get: function () {
            var msg = "Are you sure?";
            if (undefined !== this.confirmMessage && null !== this.confirmMessage) {
                if (undefined !== this.confirmMessage.modalMessage && null !== this.confirmMessage.modalMessage) {
                    msg = this.confirmMessage.modalMessage;
                }
            }
            return msg;
        },
        enumerable: true,
        configurable: true
    });
    return ConfirmModal;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Subject_1.Subject)
], ConfirmModal.prototype, "showModal", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ConfirmModal.prototype, "modalId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ConfirmModal.prototype, "response", void 0);
ConfirmModal = __decorate([
    core_1.Component({
        selector: 'confirm-modal',
        template: "<div class=\"modal fade\" id=\"{{modalId}}\" tabindex=\"-1\" role=\"dialog\" data-backdrop=\"static\" data-keyboard=\"false\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h4 class=\"modal-title\">{{modalTitle}}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    {{ modalMessage }}\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"confirm()\">Yes</button>\n                    <button type= \"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"deny()\">No</button>\n                </div>\n            </div>\n        </div>\n    </div>"
    }),
    __metadata("design:paramtypes", [])
], ConfirmModal);
exports.ConfirmModal = ConfirmModal;
//# sourceMappingURL=confirm-modal.component.js.map