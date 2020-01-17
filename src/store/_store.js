import Vue from 'vue'
import Vuex from 'vuex'
import authStore from './auth.store'
import userStore from './user.store'
import payloadStore from './payload.store'

Vue.use(Vuex);

export const store = new Vuex.Store({
   modules: {
      authStore: authStore,
      userStore: userStore,
      payloadStore: payloadStore,
   }
})
