<template>
  <div class="ilanver">
    <h2 v-if="ilanDetay" class="page-title">Yolculuk ilanı Detay</h2>
    <h2 v-else-if="ilanGuncelle" class="page-title">Yolculuk ilanı Güncelle</h2>
    <h2 v-else-if="currentUser" class="page-title">Yolculuk ilanı Ver</h2>

    <div v-if="currentUser">
      <div class="container container-medium">
        <div class="page-content">
          <div class="content-col content-col-l">
            
            <div class="form-box">
              <h2>Kalkış, varış noktaları ve saati</h2>
              <div class="form ilan-form">
                <label for="nereden_input"><span><i class="fas fa-map-marker"></i></span>Nereden yola çıkacaksın?</label>
                <input v-model="formData.nereden" id="nereden_input" type="text" placeholder="Nereden" :disabled="ilanDetay" />
                <label for="nereye_input"><span><i class="fas fa-map-marker-alt"></i></span>Nereye gideceksin?</label>
                <input v-model="formData.nereye" id="nereye_input" type="text" placeholder="Nereye" :disabled="ilanDetay" />
                <div class="form-input-line-multi">
                  <div>
                    <label for="tarih_gidis_input"><span><i class="far fa-calendar"></i></span>Gidiş tarihi</label>
                    <input v-model="formData.tarihGidis" id="tarih_gidis_input" type="date" placeholder="Gidiş Tarihi" :disabled="ilanDetay" />
                  </div>
                  <div>
                    <label for="tarih_gidis_saat_input"><span><i class="far fa-clock"></i></span>Gidiş saati</label>
                    <input v-model="formData.tarihGidisSaat" id="tarih_gidis_saat_input" type="time" placeholder="Gidiş Saati" :disabled="ilanDetay" />
                  </div>
                </div>
                <div class="form-input-line-multi">
                  <div>
                    <label for="tarih_donus_input"><span><i class="far fa-calendar"></i></span>Dönüş tarihi</label>
                    <input v-model="formData.tarihDonus" id="tarih_donus_input" type="date" placeholder="Dönüş Tarihi" :disabled="ilanDetay" />
                  </div>
                  <div>
                    <label for="tarih_donus_saat_input"><span><i class="far fa-clock"></i></span>Dönüş saati</label>
                    <input v-model="formData.tarihDonusSaat" id="tarih_donus_saat_input" type="time" placeholder="Dönüş Saati" :disabled="ilanDetay" />
                  </div>
                </div>
              </div>
            </div>

            <div class="clear"></div>

            <div class="form-box">
              <h2>Yolculuk özellikleri</h2>
              <div class="form ilan-form">
                
                <div class="form-input-line-multi">
                  <div>
                    <label for="fiyat_input"><h3>Yolcu başına ücret?</h3></label>
                  </div>
                  <div>
                    <label for="fiyat_input"><span><i class="fas fa-tag"></i> TL</span></label>
                    <input class="number-input" v-model="formData.fiyat" id="fiyat_input" type="number" placeholder="Fiyat" :disabled="ilanDetay" />
                  </div>
                </div>
                
              </div>
            </div>

            <div class="clear"></div>

            <div class="form-box">
              <div class="form ilan-form">
                
                <div class="form-input-line-multi">
                  <div>
                    <label for="koltuksayisi_input"><h3>Boş Koltuk</h3></label>
                  </div>
                  <div>
                    <label for="koltuksayisi_input"><span><i class="fas fa-car-side"></i></span></label>
                    <input class="number-input" v-model="formData.koltukSayisi" id="koltuksayisi_input" type="number" placeholder="Koltuk Sayısı" :disabled="ilanDetay" />
                  </div>
                </div>
                
              </div>
            </div>

            <div class="clear"></div>

            <div class="form-box">
              <h2>Daha fazla bilgi</h2>
              <div class="form ilan-form">
                <label for="ekstrabilgi_input">Yolculuğunla ilgili eklemek istediğin bir şey var mı?</label>
                <textarea v-model="formData.ekstraBilgi" :disabled="ilanDetay" placeholder="Buluşma yeri ve saati konusunda esnek misin? Bagajında fazla yer yok mu? Yolcularını haberdar et."></textarea>
              </div>
            </div>

            <div class="clear"></div>
            <br>
            <button v-if="!ilanDetay" @click="formGonder()">Kaydet</button>
            <button v-if="ilanGuncelle" @click="ilanSil()" style="float:right; margin-right:20px;">Sil</button>
            <br>

            <div class="clear"></div>
            <br>

          </div><!-- .content-col -->
          <div class="content-col content-col-r">
            <!-- <div id="ilanver_map" ref="ilanver_map"></div> -->

            <div class="top-sticky">
              <div v-if="selectedIlanSahibi" class="profile-card">
                <div class="profile-card-avatar">
                  <img :src="selectedIlanSahibi.photoURL" />
                </div>
                <div class="profile-card-body">
                  <p><b>{{ selectedIlanSahibi.name }} {{ selectedIlanSahibi.surname }}</b></p>
                  <p>{{ selectedIlanSahibi.email }}</p>
                </div>
              </div><!-- .profile-card -->

              <div class="puan-ver" v-if="mevcutKullaniciYolcuMu">
                Lütfen Yolculuğunuzu Puanlayınız:
                <select @change="puanla">
                  <option value="5">Çok Güzel Yolculuktu</option>
                  <option value="4">Güzel Yolculuktu </option>
                  <option value="3">Normal Yolculuktu</option>
                  <option value="2">Kötüydü</option>
                  <option value="1">Sakın Denemeyin</option>
                </select>
              </div>

              <div v-for="(yolcu, j) in yolcular" :key="j" class="profile-card">
                <div class="profile-card-avatar yolcu-avatar">
                  <img v-if="yolcu.photoURL" :src="yolcu.photoURL" />
                  <img v-else src="../assets/no-avatar.png" />
                </div>
                <div class="profile-card-body">
                  <p><b>{{ yolcu.name }} {{ yolcu.surname }}</b></p>
                </div>
                <button v-if="yolcu.userId == currentUser.uid" @click="yolcuKaldir(yolcu)" style="margin-left:5px;"><i class="fas fa-trash-alt"></i></button>
              </div><!-- .profile-card -->

              <button v-if="!mevcutKullaniciYolcuMu && ilanDetay && yolcular.length < formData.koltukSayisi" @click="yolculugaKatil()" class="btn-katil">
                YOLCULUĞA KATIL <i class="far fa-check-circle"></i>
              </button>
              <h3 v-if="ilanDetay && yolcular.length >= formData.koltukSayisi" style="text-align:center;">Malesef yolcu kapasitesi dolmuştur.</h3>

            </div><!-- .top-sticky -->

          </div><!-- .content-col -->
        </div>
      </div>
    </div>
    <div v-else>
      <button @click="oturumAc">Oturum Açınız</button>
    </div>

  </div>
</template>

<script>
import { fbauth, db } from "./../firebaseConfig";
export default {
    name : 'IlanVer',
    props: ['ilanId'],
    data: () => {
      return {
        currentUser: null,
        formData: {
          nereden: null,
          nereye: null,
          tarihGidis: null,
          tarihDonus: null,
          tarihGidisSaat: null,
          tarihDonusSaat: null,
          fiyat: null,
          koltukSayisi: null,
          ekstraBilgi: null,
          ilanSahibiId: null,
        },
        selectedIlanSahibi: null,
        ilanDetay:false,
        ilanGuncelle:false,
        yolcular:[],
        mevcutKullaniciYolcuMu:false,
      }
    },
    mounted(){
      this.currentUser = fbauth.currentUser;
      var selectedIlan = this.$store.getters.getPayloadList.filter(f=>f.id == this.ilanId)[0];
      if(this.ilanId && selectedIlan) {
        for (const key in this.formData) {
          if (this.formData.hasOwnProperty(key) && selectedIlan.hasOwnProperty(key)) {
            this.formData[key] = selectedIlan[key];
          }
        }
        this.selectedIlanSahibi = selectedIlan.user;
      } else {
        this.formData.ilanSahibiId = fbauth.currentUser.uid;
      }
      if(this.currentUser && this.ilanId){
        this.ilanDetay = (this.ilanId && this.formData.nereden && this.currentUser.uid != this.formData.ilanSahibiId);
        this.ilanGuncelle = (this.ilanId && this.currentUser.uid == this.formData.ilanSahibiId && !this.ilanDetay);
        
        this.$store.dispatch("getReservations", this.ilanId).then(list=>{
          list.forEach(element => {
            if(element.kullaniciId == this.currentUser.uid){
              this.mevcutKullaniciYolcuMu = true;
            }
            this.$store.dispatch("getOneProfileData", element.kullaniciId).then(u=>{
              if(u.data().userId){
                let udata = u.data();
                udata['parentKey'] = element.id;
                this.yolcular.push(udata);
              }
            });
          });
        });
      }
      /* this.$nextTick(() => {
        var ilanVerMap = new google.maps.Map(this.$refs.ilanver_map, {
          center: {lat:61.180059, lng: -149.822075},
          scrollwheel: false,
          zoom: 4
        });
        // console.log(this.$refs.ilanver_map);
      }); */
    },
    methods : {
      oturumAc(){
        this.$router.push({ name: 'Uyegirisi', query: { returnPage: '/ilanVer' } });
      },
      formGonder(){
        console.log('form', this.formData);
        if(this.formData.nereden && this.formData.nereye && this.formData.tarihGidis && this.formData.tarihDonus && this.formData.tarihGidisSaat && this.formData.tarihDonusSaat && this.formData.fiyat && this.formData.koltukSayisi) {
          if(this.formData.ilanSahibiId){
            this.$store.dispatch("addPayloadData", this.formData);
            this.$router.push('/ara');
          } else {
            alert('lütfen oturum açtığınızdan emin olun');
          }         
        } else {
          alert('Lütfen bilgileri dikkatlice doldurunuz');
        }
      },
      ilanSil(){
        var conf = confirm('Silmek istediğinize eminmisiniz?');
        if(conf){
          this.$store.dispatch("deletePayloadData", this.ilanId).then(()=>{
            this.$router.push('/ara');
          });
        }
      },
      puanla(e){
        var puan = e.target.value;
        console.log(puan, this.selectedIlanSahibi.userId);
        this.$store.dispatch("setPuan", {
          userId: this.selectedIlanSahibi.userId,
          puan: parseInt(puan),
        }).then(()=>{
          alert('Puanınız alınmıştır');
        });
      },
      yolculugaKatil(){
        this.$store.dispatch("addReservation", {
          ilanId: this.ilanId,
          kullaniciId: this.currentUser.uid,
        }).then(r=>{
          confirm('Başarılı bir şekilde katıldınız');
          this.$router.push('/ara');
        });
      },
      yolcuKaldir(yolcu) {
        this.$store.dispatch("deleteReservation", {
          ilanId: this.ilanId,
          parentKey: yolcu.parentKey,
        }).then(r=>{
          confirm('Yolcu iptal edildi');
          this.$router.push('/ara');
        });;
      }
    }
}
</script>

<style>
#ilanver_map {
  height:300px;
  width: 100%;
}

.number-input {
  text-align: right;
  max-width: 120px;
}

.top-sticky {
  position: sticky;
  top: 20px;
}

.profile-card {
  display: flex;
  align-items: center;
  background: rgb(231, 231, 231);
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
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
.profile-card .yolcu-avatar {
  width: 50px;
  height: 50px;
}
.profile-card .profile-card-body {
  text-align: right;
  margin-left: auto;
}
.profile-card p {
  margin: 5px 0;
}

.btn-katil {
  font-size: 1.5em;
  line-height: 1.5;
  height: 54px;
  width: 100%;
  border-radius: 15px;
}
.puan-ver select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 1em;
}
</style>