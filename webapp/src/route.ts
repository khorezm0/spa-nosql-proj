import Vue from 'vue';
import VueRouter from 'vue-router';
import StudentsList from './components/students-list.vue';
import GroupsList from './components/groups-list.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'students',
    component: StudentsList,
  },
  {
      path: '/groups',
      name: 'groups',
      component: GroupsList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
