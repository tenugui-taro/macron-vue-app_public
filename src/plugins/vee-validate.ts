import Vue from 'vue';
import {
  configure,
  extend,
  localize,
  ValidationObserver,
  ValidationProvider,
} from 'vee-validate';
import ja from 'vee-validate/dist/locale/ja';
import { required, max, min, email } from 'vee-validate/dist/rules';

const config = {
  bails: false,
  mode: 'aggressive',
};
configure(config);

extend('required', required);
extend('max', max);
extend('min', min);
extend('email', email);

localize('ja', ja);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
