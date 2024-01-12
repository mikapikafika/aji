import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css';
import CheckoutForm from './views/CheckoutForm.vue';
import ProductsTable from './views/ProductsTable.vue';

const routes = [
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutForm,
  }, 
  {
    path: '/',
    name: 'ProductsTable',
    component: ProductsTable
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
library.add(fas);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router).use(store).use(Toast).mount('#app');