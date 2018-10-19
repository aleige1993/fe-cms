<template>
  <div id="page-article-detail" class="el-form-item__content w-e-text-container">
    <h1 v-if="isShowAll">{{detail.title}}</h1>
    <h2 v-if="isShowAll">{{detail.author}} {{detail.gmtCreate}}</h2>
    <div class="w-e-text" v-html="detail.content"></div>
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
    computed: {
      isShowAll() {
        return this.$route.query.showall === 'true';
      }
    },
    async mounted() {
      let res = await this.$http.post('/article/articleList', {
        id: this.$route.query.id
      });
      this.$data.detail = res.body;
    }
  }
</script>

<style type="text/css">
  @import "../../../../static/css/wangeditor";
</style>
