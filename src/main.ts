import { createApp, h } from 'vue';
import singleSpaVue from 'single-spa-vue';

import router from './router';
import App from './App.vue';
import config from './config';
import { authEmitter } from '@/modules/auth';


const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
    router,
  },
  handleInstance: (app) => {
    app.use(router);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
export { authEmitter as emitter };

