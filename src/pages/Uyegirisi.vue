<template>
  <div class="uyegirisi">
    <h2 class="page-title">Kayıt Ol veya Giriş yap</h2>

    <div class="uye-giris">
       <div class="container container-medium">
        <div class="page-content">
            <div class="form-box">
                <h2>Kayıt Ol</h2>
                <div class="kayit-form">
                  <input type="email" v-model="email" placeholder="Email adresiniz">
                  <input type="password" v-model="password" placeholder="Şifreniz">
                  <p><button @click="kayitYap()">Kayıt Ol</button></p>
                </div>
                <div class="clear"></div>
                <h2>E-Mail ile Giriş Yap</h2>
                <div class="giris-form">
                  <input type="email" v-model="email" placeholder="Email adresiniz">
                  <input type="password" v-model="password" placeholder="Şifreniz">
                  <p><button @click="girisYap()">Giriş Yap</button></p>
                </div>
                <div class="clear"></div>
                <h2>Google ile Giriş Yap</h2>
                <div class="google-giris-form">
                  <p><button @click="googleGiris()">Google ile giris yap</button></p>
                </div>
        </div>
       </div>
    </div>
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
                this.returnPageCtrl();
            }).catch(err=>alert(err.message));
        },
        girisYap(){
            fbauth.signInWithEmailAndPassword(this.email, this.password).then(res=>{
                console.log('signInWithEmailAndPassword', res);
                this.kullanici = res.user;
                this.$store.dispatch('oturumAc', res.user);
                this.returnPageCtrl();
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
                this.returnPageCtrl();
            }).catch(err=>{
                alert(err.message);
            });
        },
        returnPageCtrl(){
            console.log('âsdasdasdasd', this.$route.query.returnPage);
            if(this.$route.query.returnPage != null)
                this.$router.push(this.$route.query.returnPage);
        }
    }

}
</script>

<style scoped>
.uye-giris {
    margin:0 auto;
    padding: 20px;
}
.uye-giris input {
    width: 100%;
    margin: 10px;
    max-width: 500px;
}
.form-box {
  border: 1px solid #ddd;
  background: #EDEDED;
  border-radius: 3px;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
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
</style>