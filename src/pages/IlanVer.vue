<template>
  <div class="ilanver">
    <h2 v-if="ilanId && formData.nereden && currentUser.uid != formData.ilanSahibiId" class="page-title">Yolculuk ilanı Detay</h2>
    <h2 v-else-if="ilanId && currentUser.uid == formData.ilanSahibiId" class="page-title">Yolculuk ilanı Güncelle</h2>
    <h2 v-else class="page-title">Yolculuk ilanı Ver</h2>

    <div v-if="currentUser">
      <div class="container container-medium">
        <div class="page-content">
          <div class="content-col content-col-l">
            
            <div class="form-box">
              <h2>Kalkış, varış noktaları ve saati</h2>
              <div class="form ilan-form">
                <label for="nereden_input"><span><i class="fas fa-map-marker"></i></span>Nereden yola çıkacaksın?</label>
                <input v-model="formData.nereden" id="nereden_input" type="text" placeholder="Nereden" />
                <label for="nereye_input"><span><i class="fas fa-map-marker-alt"></i></span>Nereye gideceksin?</label>
                <input v-model="formData.nereye" id="nereye_input" type="text" placeholder="Nereye" />
                <div class="form-input-line-multi">
                  <div>
                    <label for="tarih_gidis_input"><span><i class="far fa-calendar"></i></span>Gidiş tarihi</label>
                    <input v-model="formData.tarihGidis" id="tarih_gidis_input" type="date" placeholder="Gidiş Tarihi" />
                  </div>
                  <div>
                    <label for="tarih_gidis_saat_input"><span><i class="far fa-clock"></i></span>Gidiş saati</label>
                    <input v-model="formData.tarihGidisSaat" id="tarih_gidis_saat_input" type="time" placeholder="Gidiş Saati" />
                  </div>
                </div>
                <div class="form-input-line-multi">
                  <div>
                    <label for="tarih_donus_input"><span><i class="far fa-calendar"></i></span>Dönüş tarihi</label>
                    <input v-model="formData.tarihDonus" id="tarih_donus_input" type="date" placeholder="Dönüş Tarihi" />
                  </div>
                  <div>
                    <label for="tarih_donus_saat_input"><span><i class="far fa-clock"></i></span>Dönüş saati</label>
                    <input v-model="formData.tarihDonusSaat" id="tarih_donus_saat_input" type="time" placeholder="Dönüş Saati" />
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
                    <input class="number-input" v-model="formData.fiyat" id="fiyat_input" type="number" placeholder="Fiyat" />
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
                    <input class="number-input" v-model="formData.koltukSayisi" id="koltuksayisi_input" type="number" placeholder="Koltuk Sayısı" />
                  </div>
                </div>
                
              </div>
            </div>

            <div class="clear"></div>


            <div class="form-box">
              <h2>Daha fazla bilgi</h2>
              <div class="form ilan-form">
                <label for="ekstrabilgi_input">Yolculuğunla ilgili eklemek istediğin bir şey var mı?</label>
                <textarea v-model="formData.ekstraBilgi" placeholder="Buluşma yeri ve saati konusunda esnek misin? Bagajında fazla yer yok mu? Yolcularını haberdar et."></textarea>
              </div>
            </div>

            <div class="clear"></div>
            <br>
            <button @click="formGonder()">Kaydet</button>
            <button v-if="ilanId && currentUser.uid == formData.ilanSahibiId" @click="ilanSil()" style="float:right; margin-right:20px;">Sil</button>
            <br>

            <div class="clear"></div>
            <br>

          </div><!-- .content-col -->
          <div class="content-col content-col-r">
            <!-- <div id="ilanver_map" ref="ilanver_map"></div> -->
            
            <div v-if="selectedIlanSahibi" class="profile-card">
              <div class="profile-card-avatar">
                <img :src="selectedIlanSahibi.photoURL" />
              </div>
              <div class="profile-card-body">
                <p><b>{{ selectedIlanSahibi.name }} {{ selectedIlanSahibi.surname }}</b></p>
                <p>{{ selectedIlanSahibi.email }}</p>
              </div>
            </div><!-- .profile-card -->

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
        selectedIlanSahibi: null
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
      this.$nextTick(() => {
        /* var ilanVerMap = new google.maps.Map(this.$refs.ilanver_map, {
          center: {lat:61.180059, lng: -149.822075},
          scrollwheel: false,
          zoom: 4
        }); */
        // console.log(this.$refs.ilanver_map);
      });
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

</style>