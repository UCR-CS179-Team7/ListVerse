'use strict';

import {EditListService as ListService} from '../services/list';    

var services_module_name = 'app.services';

angular.module(services_module_name, [])
  .service('list', ListService);

export default services_module_name;
