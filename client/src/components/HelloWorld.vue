<template>
  <div class="HelloWorld">
    <p v-for="list in resultList">{{list.id}}, {{list.prize_name}}</p>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        resultList: []
      }
    },
    async mounted() {
      let res = await this.$http.get('/user/test', {});
      if (res.success) {
        this.$data.resultList = res.body;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
