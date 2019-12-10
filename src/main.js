import Vue from 'vue'
import App from './App.vue'
import SplashScreen from './SplashScreen.vue'
import './registerServiceWorker'
import router from './router/_router'
import { store } from './store/_store'
import { fbauth } from './firebaseConfig'

Vue.config.productionTip = false

require('./assets/fontawesome/all.min.css');
require('./assets/fontawesome/all.min.js');

/* 
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnVDU9EzE97SdgtZLm3v7L7AT26CuC1xI&libraries=places"></script>
*/

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