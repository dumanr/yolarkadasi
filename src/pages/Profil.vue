<template>
  <div class="profil">
    Profil sayfası

    {{ this.$store.getters.getOturumKullanici }}

    <hr>
    <button @click="cikisYap()">Çıkış Yap</button>  
    
  </div>
</template>

<script>
import { fbauth } from '../firebaseConfig'

export default {
    name: "Profil",
    methods: {
        cikisYap(){
            fbauth.signOut().then(()=>{
                this.kullanici = null;
                this.$store.dispatch('oturumKapat');
            });
        }
    }
}
</script>

<style>

</style>