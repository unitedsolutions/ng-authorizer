export default function() {
  this.resource = this.dataState.getResource('roles');
  
  this.setState();
  
  this.changer = this.resource.onUpdate().subscribe(record => {
    if(record._id === this._id) {
      this.setState();
    }
  });
  
  this.remover = this.resource.onDelete().subscribe(_id => {
    if(this._id === _id) {
      this.guardian.router.navigate(['/roles']);
    }
  });
}
