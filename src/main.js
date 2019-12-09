import Vue from 'vue'
import App from './App.vue'
import SplashScreen from './SplashScreen.vue'
import './registerServiceWorker'
import router from './router/_router'
import { store } from './store/_store'
import { fbauth } from './firebaseConfig'

Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(SplashScreen) }
}).$mount('#app');

fbauth.onAuthStateChanged(auth=>{
  store.dispatch('oturumAc', fbauth.currentUser);
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app');
});