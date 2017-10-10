import {Injectable} from '@angular/core';
import {Notifier}   from 'ng-notifier';

@Injectable()
export class DeleteConfirmerService {
  constructor(private notifier: Notifier) {}
  
  canActivate() {
    return new Promise(resolve => {
      this.notifier.send('roles-actioner', {
        message: 'Are you sure you want to delete a role?',
        title: 'Delete role',
        classes: {
          icon: 'fa fa-warning red-alert',
          closer: 'fa fa-times-circle'
        },
        actions: [
          {
            label: 'Delete',
            class: 'btn btn-danger',
            callback: () => resolve(true)
          },
          {
            label: 'Cancel',
            class: 'btn btn-secondary',
            callback: () => resolve(),
            onClose: true
          }
        ]
      });      
    });
  }
}
