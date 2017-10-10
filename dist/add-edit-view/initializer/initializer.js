export default function () {
    var _this = this;
    this.resource = this.dataState.getResource('roles');
    this.setState();
    this.changer = this.resource.onUpdate().subscribe(function (record) {
        if (record._id === _this._id) {
            _this.setState();
        }
    });
    this.remover = this.resource.onDelete().subscribe(function (_id) {
        if (_this._id === _id) {
            _this.guardian.router.navigate(['/roles']);
        }
    });
}
//# sourceMappingURL=initializer.js.map