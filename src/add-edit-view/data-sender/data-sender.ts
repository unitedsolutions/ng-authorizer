import * as _               from 'lodash';
import {successConfigs}     from '../../_lib/notifier-configs';
import notificationMessages from './_lib/notification-messages';
import routesBuilder        from './routes-builder/routes-builder';

export default function() {
  let routesAndEndpoints = routesBuilder.call(this);
  let data = _.extend({...routesAndEndpoints}, this.form.value);
  let message = notificationMessages[this.httpMethod];

  this.guardian.router.navigate(['/roles/list']);
  this.notifier.send('roles-messager', {message, ...successConfigs});    
  this.resource[this.httpMethod]({data});
}
