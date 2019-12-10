import Vue from 'vue'
import VueRouter from 'vue-router'

import Anasayfa from '@/pages/Anasayfa';
import YolculukAra from '@/pages/YolculukAra';
import Uyegirisi from '@/pages/Uyegirisi';
import Profil from '@/pages/Profil';
import { store } from '../store/_store';

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Anasayfa', component: Anasayfa },
  { path: '/ara', name: 'YolculukAra', component: YolculukAra },
  { path: '/giris', name: 'Uyegirisi', component: Uyegirisi },
  {
    path: '/ilanver', name: 'İlanVer', component: function () {
      return import(/* webpackChunkName: "ilanver" */ '../pages/IlanVer.vue')
    }
  },
  { path: '/profil', name: 'Profil', component: Profil },
]


const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  /* console.log(to); */
  if(to.path == "/profil" && !store.getters.getOturum) {
    next('/giris');
  }
  if(to.path == "/giris" && store.getters.getOturum) {
    next('/profil');
  }
  next();
})

export default router
