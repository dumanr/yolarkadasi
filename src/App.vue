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

/**/
.form-box {
  border: 1px solid #ddd;
  background: #EDEDED;
  border-radius: 3px;
  padding: 17px;
  margin-right: 20px;
}
.form-box h2 {
  border-bottom: 1px solid #ddd;
  line-height: 39px;
  margin: -17px -17px 17px -17px;
  padding: 0 0 0 17px;
  font-size: 18px;
  font-weight: normal;
  background-color: #fff;
}

.form {
  display: flex;
  flex-direction: column;
}
.form input, .form textarea {
  border: 1px solid #ddd;
  padding: 4px;
  height: 28px;
  line-height: 21px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border linear .2s,box-shadow linear .2s;
  margin-bottom: 20px;
  padding-left: 34px;
}
.form label {
  position: relative;
  font-size: 14px;
  margin-bottom: 5px;
}
.form textarea {
  min-height: 70px;
  padding: 10px;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  font-family: inherit;
}
.form label span {
  position: absolute;
  bottom: -32px;
  left: 10px;
}
.form input:focus {
  border-color: rgba(0,175,245,0.8);
  box-shadow: inset 0 1px 1px rgba(5,71,82,0.075), 0 0 8px rgba(0,175,245,0.6);
}
.form .form-input-line-multi {
  display: flex;
}
.form .form-input-line-multi div {
  flex: 0 1 80%;
  display: flex;
  flex-direction: column;
}
.form .form-input-line-multi div:last-child {
  flex: 0 1 20%;
  margin-left: 10px;
}

</style>
