<template>
  <div class="uyegirisi">
    <h2 class="page-title">Kayıt Ol veya Giriş yap</h2>

    <div class="uye-giris">
      <div class="container container-medium">
        <div class="page-content">
          
          <div class="content-col content-col-l">
            <div v-if="pageLogin" class="form-box">
              <h2>E-Mail ile Giriş Yap</h2>
              <div class="form kayit-form">
                <label for="input_login_email"><span><i class="fas fa-user"></i></span>Email adresiniz</label>
                <input type="email" id="input_login_email" v-model="email" placeholder="Email adresiniz" />
                <label for="input_login_pass"><span><i class="fas fa-user"></i></span>Şifreniz</label>
                <input type="password" id="input_login_pass" v-model="password" placeholder="Şifreniz" />
                <p>
                  <button @click="girisYap()">Giriş Yap</button>
                  <button class="btn-light" @click="() => this.pageLogin = false">Kayıt Ol</button>
                </p>
              </div>
            </div>
            <div v-if="!pageLogin" class="form-box">
              <h2>Kayıt Ol</h2>
              <div class="form kayit-form">
                <label for="input_reg_email"><span><i class="fas fa-user"></i></span>Email adresiniz</label>
                <input type="email" id="input_reg_email" v-model="email" placeholder="Email adresiniz" />
                <label for="input_reg_pass"><span><i class="fas fa-user"></i></span>Şifreniz</label>
                <input type="password" id="input_reg_pass" v-model="password" placeholder="Şifreniz" />
                <label for="input_reg_adsoyad"><span><i class="fas fa-user"></i></span>Ad Soyad</label>
                <input type="text" id="input_reg_adsoyad" v-model="adsoyad" placeholder="Ad Soyad" />

                <p>
                  <button @click="kayitYap()">Kayıt Ol</button>
                  <button class="btn-light" @click="() => this.pageLogin = true">Giriş Yap</button>
                </p>
              </div>
            </div>
          </div><!-- .content-col-l -->

          <div class="content-col content-col-r">
            <div class="form-box">
              <h2>Google ile Giriş Yap</h2>
              <div class="google-giris-form">
                <p><button class="btn-block" @click="googleGiris()">Google ile giris yap</button></p>
              </div>
            </div>
          </div><!-- .content-col-r -->

          
        </div><!-- .page-content -->
      </div><!-- .container -->

    </div><!-- .uye-giris -->
  </div>
</template>

<script>
import { fbauth } from "../firebaseConfig";
import firebase from "firebase";

export default {
  name: "Uyegirisi",
  data: () => {
    return {
      kullanici: null,
      email: "",
      password: "",
      adsoyad: "",
      oturumBilgisi: false,
      pageLogin: true,
    };
  },
  created() {
    fbauth.onAuthStateChanged(user => {
      this.kullanici = user;
    });
    this.oturumBilgisi = this.$store.getters.getOturum;
  },
  methods: {
    girisYap() {
      fbauth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log("signInWithEmailAndPassword", res);
          this.kullanici = res.user;
          this.$store.dispatch("oturumAc", res.user);
          this.returnPageCtrl();
        })
        .catch(err => alert(err.message));
    },
    kayitYap() {
      fbauth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log("createUserWithEmailAndPassword", res);
          this.kullanici = res.user;
          this.isNewUserSaveData(res, {
            'userId': res.user.uid,
            'name': null,
            'surname': null,
            'email': res.user.email,
            'photoURL': res.user.photoURL,
            'provider': res.additionalUserInfo.providerId,
          });
          this.$store.dispatch("oturumAc", res.user);
          this.returnPageCtrl();
        })
        .catch(err => alert(err.message));
    },
    googleGiris() {
      var provider = new firebase.auth.GoogleAuthProvider();
      fbauth
        .signInWithPopup(provider)
        .then(res => {
          console.log("signInWithPopup", res);
          var token = res.credential.accessToken;
          var user = res.user;
          this.kullanici = user;
          this.isNewUserSaveData(res, {
            'userId': res.user.uid,
            'name': res.additionalUserInfo.profile.given_name,
            'surname': res.additionalUserInfo.profile.family_name,
            'email': res.user.email,
            'photoURL': res.user.photoURL,
            'provider': res.additionalUserInfo.providerId,
          });
          this.$store.dispatch("oturumAc", user);
          this.returnPageCtrl();
        })
        .catch(err => {
          alert(err.message);
        });
    },
    returnPageCtrl() {
      if (this.$route.query.returnPage != null)
        this.$router.push(this.$route.query.returnPage);
      else
        this.$router.push('/');
    },
    isNewUserSaveData(res, profileData){
      if(res.additionalUserInfo.isNewUser){
        this.$store.dispatch("sendProfileData", profileData);
      }
    }
  }
};
</script>

<style scoped>
.uye-giris {
  margin: 0 auto;
  padding: 20px;
}
.btn-light {
  background: none;
  margin-left: 20px;
  color: rgb(124, 124, 124);
}
.btn-block {
  width: 100%;
}
.content-col-r {
  border-left: 0;
}
</style>