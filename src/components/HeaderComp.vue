<template>
  <div class="header">
    <div class="container">
        <img @click="anasayfaAc()" class="header-logo" alt="YolArkadaşı" src="../assets/logo.png">
        <nav class="top-menu">
            <ul>
                <li><a @click="anasayfaAc()"><i class="fas fa-home"></i>Anasayfa</a></li>
                <li><a @click="yolculukAc()"><i class="fas fa-search"></i>Yolculuk Ara</a></li>
                <li><a @click="ilanverAc()"><i class="fas fa-plus"></i>İlan Ver</a></li>
                <li v-if="!this.$store.getters.getOturum"><a @click="UyegirisiAc()"><i class="fas fa-sign-in-alt"></i>Giris</a></li>
                <li v-if="this.$store.getters.getOturum"><a @click="profilAc()"><i class="far fa-user-circle"></i>Profil</a></li>
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
    border-bottom: 1px solid #efefef;
    min-height: 72px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.header-logo {
    height: 32px;
    cursor: pointer;
}
.top-menu ul {
    display: flex;
}
.top-menu ul li {
    margin-left: 24px;
    font-weight: bold;
}
.top-menu ul li svg {
    margin-right: 8px;
}
</style>