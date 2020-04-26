<template>
  <div class="yolculukara">
    <h2 class="page-title">Yolculuk Ara</h2>

    <div class="search-box">
      <input v-model="inputNereden" type="text" placeholder="Nereden">
      <input v-model="inputNereye" type="text" placeholder="Nereye">
    </div>


    <div v-for="(ilan, index) in filteredList" :key="index">
      <div class="ilan-card" @click="detailIlan(ilan)">
        <div v-if="ilan.user" class="card-left">
          <div class="ilan-card-avatar">
            <img v-if="ilan.user.photoURL" :src="ilan.user.photoURL" />
            <img v-else src="../assets/no-avatar.png" />
          </div>
          <h4>{{ ilan.user.name }} {{ ilan.user.surname }}</h4>
          <h5>{{ ilan.user.marka }}</h5>
          <span class="yildizlar">
            <i v-for="(p,k) in ilan.user.puan" :key="k" class="fas fa-star"></i>
            <i v-for="(p,k) in 5 - ilan.user.puan" :key="k" class="far fa-star"></i>
          </span>
        </div>
        <div class="card-right">
          <h2>
            {{ ilan.nereden }}
            <i class="fas fa-long-arrow-alt-right"></i>
            {{ ilan.nereye }}
          </h2>
          <h4>
            <small>Başlangıç Tarihi: </small>
            <i class="far fa-calendar"></i>
            {{ ilan.tarihGidis }}
            <i class="far fa-clock"></i>
            {{ ilan.tarihGidisSaat }}
          </h4>
          <h4>
            <small>Bitiş Tarihi: </small>
            <i class="far fa-calendar"></i>
            {{ ilan.tarihDonus }}
            <i class="far fa-clock"></i>
            {{ ilan.tarihDonusSaat }}
          </h4>
          <h3>
            <i class="fa fa-car-side"></i> Koltuk Sayısı: {{ ilan.koltukSayisi }}
          </h3>
          <h3 style="margin-bottom:0">
            <i class="fas fa-tag"></i>
            {{ ilan.fiyat }} TL
          </h3>
          <p><small>{{ ilan.ekstraBilgi }}</small></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YolculukAra",
  data: () => {
    return {
      ilanList: [],
      inputNereden: '',
      inputNereye: ''
    };
  },
  methods: {
    getList() {
      return this.$store.getters.getPayloadList;
    },
    detailIlan(ilan){
      this.$router.push('/ilanver/' + ilan.id);
    },
  },
  computed: {
    filteredList() {
      return this.ilanList.filter(post => {
        return post.nereden.toLowerCase().includes(this.inputNereden.toLowerCase()) && post.nereye.toLowerCase().includes(this.inputNereye.toLowerCase());
      });
    }
  },
  mounted() {
    if(this.$store.getters.getPayloadList.length < 1){
      this.$store.dispatch("getPayloadData").then(r => {
        var list = this.$store.getters.getPayloadList;
        list.forEach(async element => {
          await this.$store.dispatch("getOneProfileData", element.ilanSahibiId).then(u => {
            element.user = u.data();
          });
          this.ilanList.push(element);
        });
      });
    } else {
      this.ilanList = this.$store.getters.getPayloadList;
    }
  }
};
</script>

<style scoped>
.ilan-card {
  display: flex;
  background: rgb(248, 248, 248);
  padding: 10px;
  border-radius: 10px;
  margin: 25px auto;
  width: 100%;
  max-width: 500px;
  cursor: pointer;
  box-shadow: 0px 0px 1px rgb(168, 168, 168);
}
.ilan-card:hover {
  box-shadow: 0px 0px 2px rgb(83, 83, 83);
}
.card-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
}
.card-left h4, .card-left h5 {
  text-align: center;
  margin: 5px 0 0 0;
}
.card-right {
  width: 70%;
}
.ilan-card .ilan-card-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}
.ilan-card .ilan-card-avatar img {
  position: absolute;
  object-fit: cover;
  width: auto;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.ilan-card h2 {
  margin: 5px 0 10px 0;
  color: #00AFF5;
}
.card-right h4 {
  margin: 5px;
  text-align: right;
}
.card-right h3 {
  margin: 15px 5px 5px 5px;
  text-align: right;
}
.card-right .ilan-card h5 {
  margin: 5px;
}
.card-right .ilan-card small {
  font-weight: 100;
}
.card-right p {
  margin:3px 0 0 0;
  color:gray;
}
.search-box {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
}
.search-box input {
  width: 50%;
  padding: 10px;
  font-weight: 900;
  font-family: inherit;
  margin: 5px;
  border: 2px solid rgb(226, 226, 226);
  border-radius: 10px;
}
.search-box input:focus {
  outline: 0;
}
</style>