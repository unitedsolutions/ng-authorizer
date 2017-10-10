import * as _       from 'lodash';
import {Injectable} from '@angular/core';
import {DataState}  from 'ng-data-state';

@Injectable()
export class RolesDataResolverService {
  constructor(private dataState: DataState) {}

  resolve() {
    return this.dataState.createResource({name: 'roles'});
  }
}
