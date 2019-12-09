<template>
  <div class="header">
    <div class="container">
        <img alt="Vue logo" src="../assets/logo.png">
        <nav class="top-menu">
            <ul>
                <li><a @click="anasayfaAc()">Anasayfa</a></li>
                <li><a @click="yolculukAc()">Yolculuk Ara</a></li>
                <li><a @click="ilanverAc()">İlan Ver</a></li>
                <li v-if="!this.$store.getters.getOturum"><a @click="UyegirisiAc()">Giris</a></li>
                <li v-if="this.$store.getters.getOturum"><a @click="profilAc()">Profil</a></li>
            </ul>
        </nav>
    </div>
  </div>
</template>

<script>
export default {
    name: 'HeaderComp',
    methods: {
        anasayfaAc(){
            this.$router.push('/');
        },
        yolculukAc(){
            this.$router.push('/ara');
        },
        ilanverAc(){
            this.$router.push('/ilanver');
        },
        UyegirisiAc(){
            this.$router.push('/giris');
        },
        profilAc(){
            this.$router.push('/profil');
        }
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid #808080;
}
.header .container {
    justify-content: space-between;
}
.top-menu ul {
    display: flex;
}
.top-menu ul li {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid #4b4b4b;
}
</style>