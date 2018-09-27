<template>
  <div id="advertdetails" >
    <div v-html="htmlData.content"></div>
  </div>
</template>

<script>
  export default {
    name: "Advertdetails",
    data() {
      return {
        htmlData:{}
      };
    },
    methods: {

    },
    async mounted() {
     let id = this.$route.query.id;
     let res = await this.$http.get('/advert/advertList',{'id':id});
      if(res.success && res.body){
          this.$data.htmlData = res.body;
      }
    }
  };
</script>
<style lang="scss" scoped>

</style>


