"use strict";
var RecordModel = (function () {
    function RecordModel() {
        this.id = 0;
        this.queuedFiles = new Array();
    }
    return RecordModel;
}());
exports.RecordModel = RecordModel;
var FileModel = (function () {
    function FileModel() {
        this.id = 0;
        this.recordId = 0;
    }
    return FileModel;
}());
exports.FileModel = FileModel;
//# sourceMappingURL=file.model.js.map