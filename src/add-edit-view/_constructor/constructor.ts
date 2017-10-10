import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute}       from '@angular/router';
import {Guardian}             from 'ng-guardian';
import {HttpClientPlus}       from 'ng-http-client-plus';
import {DataState}            from 'ng-data-state';
import {Notifier}             from 'ng-notifier';

@Component({
  templateUrl: './add-edit-view.component.html',
  styleUrls: ['./add-edit-view.component.less']
}) 
export class AddEditViewComponent {
  view;
  routes;
  httpMethod;
  originalRoutes;
  selectedRoutes;
  setState;
  resource;
  _id;
  remover;
  changer;
  @ViewChild('f') form;
  
  constructor(
    private guardian: Guardian,
    private http: HttpClientPlus, 
    private dataState: DataState,
    private route: ActivatedRoute,
    private notifier: Notifier
  ) {}
}
