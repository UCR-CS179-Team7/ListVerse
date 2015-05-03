'use strict';

import {default as ListController} from '../controllers/list'
import {default as ItemController} from '../controllers/item'
import {default as ConfirmController} from '../controllers/confirm'
import {default as services_module_name} from './services' 

var controllers_module_name = 'app.controllers';

angular.module(controllers_module_name, [
    services_module_name
])
  .controller('ListController', ListController)
  .controller('ItemController', ItemController)
  .controller('ConfirmController', ConfirmController);

export default controllers_module_name;
