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
@import url('https://fonts.googleapis.com/css?family=Varela+Round&display=swap');

body {
  padding: 0;
  margin: 0;
  font-family: 'Varela Round', sans-serif;
}
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
.container-medium {
  max-width: 900px;  
}
.container-small {
  max-width: 600px;  
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #054752;
}
.clear {
  clear: both;
  display: inline-block;
}
ul, li {
  list-style: none;
}
a {
  cursor: pointer;
  color: #00AFF5;
}
button {
  background: #00AFF5;
  display: inline-block;
  box-sizing: border-box;
  height: 36px;
  padding: 10px 15px;
  border: 0;
  border-radius: 3px;
  color: #fff;
  font-family: gt-eesti,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  text-decoration: none;
  box-shadow: inset 0 -2px rgba(5,71,82,0.2);
  cursor: pointer;
  vertical-align: baseline;
}
input, textarea {
  font-size: 18px;
}
.page-content {
  display: flex;
}
.page-content .content-col {
  text-align: start;
  flex: 0 1 auto;
}
.content-col-l { flex: 0 1 65% !important; }
.content-col-r { flex: 0 1 35% !important; border-left: 1px solid #dfdfdf; }

</style>
