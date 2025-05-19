import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/users', name: 'UserList', component: () => import('@/views/UserList.vue') },
  { path: '/posts', name: 'PostList', component: () => import('@/views/PostList.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
