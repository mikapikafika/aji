import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CheckoutForm from './views/CheckoutForm.vue';
import ProductsTable from './views/ProductsTable.vue';

const routes = [
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutForm
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

createApp(App).use(router).mount('#app');