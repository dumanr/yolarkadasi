<template>
  <div id="app">
    <HeaderComp />
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderComp from './components/HeaderComp.vue'
import {fbauth} from './firebaseConfig'

export default {
  name: 'app',
  components: {
    HeaderComp,
  },
  created(){
    fbauth.onAuthStateChanged(auth => {
      this.$store.dispatch('oturumAc', fbauth.currentUser);
    });
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
.container {
  width: auto;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
ul, li {
  list-style: none;
}
a {
  cursor: pointer;
}
</style>
