<template>
  <div class="ilanver">
    <h2 class="page-title">Yolculuk ilanı ver</h2>


    <div v-if="user">
      <div class="container container-medium">
        <div class="page-content">
          <div class="content-col content-col-l">
            
            <div class="form-box">
              <h2>Kalkış, varış noktaları ve saati seçin</h2>
              <div class="ilan-form">
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
              <div class="ilan-form">
                
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
              <div class="ilan-form">
                
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
              <div class="ilan-form">
                <label for="ekstrabilgi_input">Yolculuğunla ilgili eklemek istediğin bir şey var mı?</label>
                <textarea v-model="formData.ekstraBilgi" placeholder="Buluşma yeri ve saati konusunda esnek misin? Bagajında fazla yer yok mu? Yolcularını haberdar et."></textarea>
              </div>
            </div>


            <div class="clear"></div>

            <button @click="formGonder()">Gönder</button>

          </div><!-- .content-col -->
          <div class="content-col content-col-r">
            <div id="ilanver_map" ref="ilanver_map"></div>
            
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
    data: () => {
      return {
        user: null,
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
        },
      }
    },
    mounted(){
      this.user = fbauth.currentUser;
      this.$nextTick(() => {
        /* var ilanVerMap = new google.maps.Map(this.$refs.ilanver_map, {
          center: {lat:61.180059, lng: -149.822075},
          scrollwheel: false,
          zoom: 4
        }); */
        console.log(this.$refs.ilanver_map);
      });      
    },
    methods : {
      oturumAc(){
        this.$router.push({ name: 'Uyegirisi', query: { returnPage: '/ilanVer' } });
      },
      formGonder(){
        console.log('form', this.formData);
        /* if(!this.formData.nereden || !this.formData.nereye || !this.formData.tarihGidis || !this.formData.tarihGidisSaat) {
          alert('Formu tam giriniz');
          return;
        }
        db.collection('ilanlar').add(this.formData).then(t => {
          this.$router.push('/');
        }).catch(err=>console.log(err)); */
      }
    }
}
</script>

<style>
#ilanver_map {
  height:300px;
  width: 100%;
}
.form-box {
  border: 1px solid #ddd;
  background: #EDEDED;
  border-radius: 3px;
  padding: 17px;
  margin-right: 20px;
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

.ilan-form {
  display: flex;
  flex-direction: column;
}
.ilan-form input, .ilan-form textarea {
  border: 1px solid #ddd;
  padding: 4px;
  height: 28px;
  line-height: 21px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border linear .2s,box-shadow linear .2s;
  margin-bottom: 20px;
  padding-left: 34px;
}
.ilan-form label {
  position: relative;
  font-size: 14px;
  margin-bottom: 5px;
}
.ilan-form label span {
  position: absolute;
  bottom: -32px;
  left: 10px;
}
.ilan-form input:focus {
  border-color: rgba(0,175,245,0.8);
  box-shadow: inset 0 1px 1px rgba(5,71,82,0.075), 0 0 8px rgba(0,175,245,0.6);
}
.ilan-form .form-input-line-multi {
  display: flex;
}
.ilan-form .form-input-line-multi div {
  flex: 0 1 80%;
  display: flex;
  flex-direction: column;
}
.ilan-form .form-input-line-multi div:last-child {
  flex: 0 1 20%;
  margin-left: 10px;
}
.ilan-form textarea {
  min-height: 70px;
  padding: 10px;
  font-size: 14px;
  font-weight: normal;
  line-height: 18px;
  font-family: inherit;
}
.number-input {
  text-align: right;
  max-width: 120px;
}

</style>