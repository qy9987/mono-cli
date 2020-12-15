import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import store from './store';
Vue.config.productionTip = false;
import './public-path';
import VueRouter from 'vue-router';

let instance: Vue | null = null;
function render(props: { container: HTMLElement; routerBase: string; history: boolean }) {
  const { container, routerBase, history } = props || {};
  const router = new VueRouter({
    base: routerBase,
    mode: history ? 'history' : 'hash',
    routes
  });
  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') || undefined : '#app');
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: {
  container: HTMLElement;
  routerBase: string;
  history: boolean;
}) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  if (instance) {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
  }
}
