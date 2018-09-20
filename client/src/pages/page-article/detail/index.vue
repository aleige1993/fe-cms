
<template>
  <div id="page-article-detail">
    <!--<h1>{{detail.title}}</h1>-->
    <div v-html="detail.content"></div>
  </div>
</template>

<script>
  export default {
    name: 'page-article-detail',
    data() {
      return {
        detail: {}
      }
    },
    async mounted() {
      let res = await this.$http.get('/article/articleList?id=' + this.$route.query.id);
      this.$data.detail = res.body;
    }
  }
</script>
