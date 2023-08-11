// router.js
import { createRouter, createWebHistory } from 'vue-router';
import index from './views/index.vue';
import updata from './views/updata.vue';
import updataFile from './views/updataFile.vue';

const routes = [
  { path: '/', component: index },

  { path: '/updata', component: updata },

  { path: '/updataFile', component: updataFile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;