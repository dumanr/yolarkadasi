<template>
  <div class="yolculukara">
    <h2 class="page-title">Yolculuk Ara</h2>

    <div v-for="(ilan, index) in ilanList" :key="index">
        {{ index }} : {{ ilan }}
        <hr>
    </div>

  </div>
</template>

<script>
export default {
  name: "YolculukAra",
  data: () => {
    return {
      ilanList: [],
    };
  },
  methods: {},
  created(){
    this.$store.dispatch("getPayloadData");
    this.ilanList = this.$store.getters.getPayloadList;
  },
};
</script>

<style>
</style>