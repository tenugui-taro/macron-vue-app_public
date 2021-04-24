import Vue from 'vue';

// [todo]ログ収集を行う処理を実装
Vue.config.errorHandler = (err, vm, info) => {
  console.log('Vue.config.errorHandler:', info, err);
};

Vue.config.warnHandler = (msg, vm, trace) => {
  console.log('Vue.config.warnHandler:', msg, trace);
};

window.addEventListener('error', (event) => {
  console.log('error EventListener:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.log('unhandledrejection EventListener:', event.reason);
});
