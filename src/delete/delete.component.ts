import * as _                   from 'lodash';
import {Component}              from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClientPlus}         from 'ng-http-client-plus';
import {DataState}              from 'ng-data-state';
import {Notifier}               from 'ng-notifier';
import pause                    from '../_lib/pause';
import {successConfigs}         from '../_lib/notifier-configs';

@Component({template: ''})
export class DeleteComponent {
  constructor(
    private route: ActivatedRoute, 
    private dataState: DataState, 
    private router: Router, 
    private notifier: Notifier
  ) {}
  
  async ngOnInit() {
    let {id} = this.route.snapshot.params;
    let outletAddress = ['/roles', {outlets: {empty: null}}];
    
    this.dataState.getResource('roles').delete({data: {_id: id}});
    this.notifier.send('roles-messager', {
      message: 'The role was deleted',
      ...successConfigs
    });
    
    await pause();
    this.router.navigate(outletAddress, {skipLocationChange: true, replaceUrl: true});
    this.router.navigateByUrl('/roles/list', {replaceUrl: true});    
  }
}
