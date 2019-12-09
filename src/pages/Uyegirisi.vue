<template>
  <div class="uyegirisi">
       
       <div class="uye-giris">

            <input type="email" v-model="email" placeholder="Email adresiniz">
            <input type="password" v-model="password" placeholder="Şifreniz">
            <button @click="kayitYap()">Kayıt Ol</button>
            <button @click="girisYap()">Giriş Yap</button>

            <br><br>
            <button @click="googleGiris()">Google ile giris yap</button>
            <hr>
            {{this.$store.getters.getOturum}}

       </div>
       
   </div>
</template>

<script>
import { fbauth } from '../firebaseConfig'
import firebase from 'firebase'

export default {
    name : 'Uyegirisi',
    data: () => {
        return {
            kullanici: null,
            email: '',
            password: '',
            oturumBilgisi : false
        }
    },
    created(){
        fbauth.onAuthStateChanged(user=>{
            console.log('onAuthChage',user);
            this.kullanici = user;
        });
        this.oturumBilgisi = this.$store.getters.getOturum;
    },
    methods : {
        kayitYap(){
            fbauth.createUserWithEmailAndPassword(this.email, this.password).then(res=>{
                console.log('createUserWithEmailAndPassword',res);
                this.kullanici = res.user;
                this.$store.dispatch('oturumAc', res.user);
            }).catch(err=>alert(err.message));
        },
        girisYap(){
            fbauth.signInWithEmailAndPassword(this.email, this.password).then(res=>{
                console.log('signInWithEmailAndPassword', res);
                this.kullanici = res.user;
                this.$store.dispatch('oturumAc', res.user);
            }).catch(err=>alert(err.message));
        },
        googleGiris(){
            var provider = new firebase.auth.GoogleAuthProvider();
            fbauth.signInWithPopup(provider).then(res=>{
                console.log('signInWithPopup',res);
                var token = res.credential.accessToken;
                var user = res.user;
                this.kullanici = user;
                this.$store.dispatch('oturumAc', user);
            }).catch(err=>{
                alert(err.message);
            });
        }
    }

}
</script>

<style scoped>
.uye-giris {
    margin: 0 auto;
    padding: 20px;
}
.uye-giris input {
    width: 100%;
    margin: 10px;
    max-width: 300px;
}

</style>