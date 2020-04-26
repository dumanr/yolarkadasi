<template>
  <div class="profil">
    <h2 class="page-title">Hesabım</h2>    

    <div v-if="user" class="container container-medium">
        <div class="page-content">
            
            <div class="profile-card">
              <div class="profile-card-avatar">
                <img :src="this.$store.getters.getProfileData.photoURL" />
              </div>
              <div class="profile-card-body">
                <p><b>{{ this.$store.getters.getProfileData.name }} {{ this.$store.getters.getProfileData.surname }}</b></p>
                <p>{{ this.$store.getters.getProfileData.email }}</p>
                <button @click="cikisYap()">Çıkış Yap</button>
              </div>
            </div><!-- .profile-card -->

            <ul class="tab-menu">
              <li @click="currentTab = 'ayarlar'"><i class="fas fa-user-cog"></i> Düzenle</li>
              <li @click="currentTab = 'ilanlarim'"><i class="fas fa-th-list"></i> İlanlarım</li>
            </ul>

            <div v-if="currentTab == 'ayarlar'" class="tab-content">

              <div class="form-box">
                <h2>Bilgileriniz</h2>
                <div class="form ilan-form">
                  <label for="input_ad">Adınız</label>
                  <input id="input_ad" v-model="user.name">
                  <label for="input_soyad">Soyadınız</label>
                  <input id="input_soyad" v-model="user.surname">
                  <label for="input_marka">Aracınızın Markası</label>
                  <input id="input_marka" v-model="user.marka">
                  <button @click="kaydetProfil()">Kaydet</button>
                </div>
              </div>

            </div>
            <div v-if="currentTab == 'ilanlarim'" class="tab-content">

              <div v-for="(ilan,i) in this.$store.getters.getPayloadList" :key="i">
                <div v-if="ilan.ilanSahibiId == currentUserId" class="ilan-item" @click="detailIlan(ilan)">
                  {{ ilan.nereden }} <i class="fas fa-long-arrow-alt-right"></i> {{ ilan.nereye }}
                </div>
              </div>

            </div>

        </div><!-- .page-content -->
    </div>
    <div v-else>
      <button @click="oturumAc">Oturum Açınız</button>
    </div>


  </div>
</template>

<script>
import { fbauth } from '../firebaseConfig'

export default {
    name: "Profil",
    data: () => {
      return {
        user:null,
        currentUserId: null,
        currentTab:'ayarlar'
      };
    },
    mounted(){
      if(fbauth && fbauth.currentUser){
        if(this.$store.getters.getProfileData){
          this.user = this.$store.getters.getProfileData;
        } else {
          this.$store.dispatch('profileData', fbauth.currentUser.uid).then(u=>{
            this.user = this.$store.getters.getProfileData;
          });
        }
        this.currentUserId = fbauth.currentUser.uid;
      }
    },
    methods: {
        cikisYap(){
            fbauth.signOut().then(()=>{
                this.kullanici = null;
                this.$store.dispatch('oturumKapat');
                this.$router.push('/giris');
            });
        },
        oturumAc(){
          this.$router.push('/giris');
        },
        kaydetProfil(){
          var setVal = {};
          for (const key in this.user) {
            if (this.user.hasOwnProperty(key)) {
              setVal[key] = this.user[key];
            }
          }
          setVal["userId"] = this.currentUserId;
          this.$store.dispatch('sendProfileData', setVal).then(()=>{
            this.$router.push('/');
          });
        },
        detailIlan(ilan){
          this.$router.push('/ilanver/' + ilan.id);
        }
    }
}
</script>

<style scoped>
.page-content {
  flex-direction: column;
}

.profile-card {
  display: flex;
  align-items: center;
  background: rgb(231, 231, 231);
  padding: 10px;
  border-radius: 10px;
  margin: 10px auto;
  width: 100%;
  max-width: 400px;
}
.profile-card .profile-card-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  position: relative;
}
.profile-card .profile-card-avatar img {
  position: absolute;
  object-fit: cover;
  width: auto;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.profile-card .profile-card-body {
  text-align: right;
  margin-left: auto;
}
.profile-card p {
  margin: 5px 0;
}


.tab-menu {
  display: flex;
  justify-content: center;
}
.tab-menu li {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}

.tab-content {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
}
.tab-content .form-box {
  margin-right: 0;
}

.tab-content .ilan-item {
  border: 1px solid rgb(211, 211, 211);
  padding: 10px;
  margin: 5px;
  cursor: pointer;
}
.tab-content .ilan-item:hover {
  border-color: gray;
}

</style>