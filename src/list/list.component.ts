import * as _          from 'lodash';
import {Component}     from '@angular/core';
import {Router}        from '@angular/router';
import {Guardian}      from 'ng-guardian';
import {DataState}     from 'ng-data-state';
import {Notifier}      from 'ng-notifier';

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent {
  roles = [];
  remover;
  changer;
  adder;
  publisher;
  
  private messager(message) {
    this.notifier.send('roles-messager', {
      message,
      classes: {
        container: 'mt-4',
        notifier: 'alert alert-warning',
        icon: 'fa fa-warning'
      },
      activeTime: 2500
    });
  }
  
  constructor(
    private dataState: DataState, 
    private notifier: Notifier, 
    private guardian: Guardian,
    private router: Router
  ) {}
  
  ngOnInit() {
    let resource = this.dataState.getResource('roles');

    this.publisher = resource.onPublish().subscribe(roles => {
      _.extend(this, {roles});
    });
    
    this.remover = resource.onDelete().subscribe(() => {
      this.messager('One of the records was deleted');
    });
    
    this.changer = resource.onUpdate().subscribe(record => {
      this.messager('One of the records was changed');
    });
    
    this.adder = resource.onAdd().subscribe(record => {
      this.messager('A new record was added');
    });
  }
  
  ngOnDestroy() {
    ['publisher', 'remover', 'changer', 'adder'].forEach(type => {
      this[type].complete();
    });
  }
}
