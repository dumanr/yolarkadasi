<template>
  <div class="anasayfa">
    <!-- <h2 class="page-title">Anasayfa</h2> -->

    <div class="hero">
      <div class="hero-body">
        <h2>Yolculuğunuza arkadaş bulun</h2>
        <button @click="ara()">Yolcuk Ara</button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
    name: 'Anasayfa',
    methods: {
      ara(){
        this.$router.push('/ara');
      }
    }
}
</script>

<style scoped>
.hero {
  background-image: url(../assets/bg-hero.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  height: 80vh;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.hero-body {
  margin-bottom: 50px;
  zoom: 1.5;
}
.hero-body h2 {
  text-shadow: 0px 1px 1px rgb(121, 121, 121);
}
</style>