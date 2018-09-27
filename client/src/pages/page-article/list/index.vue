
<template>
  <div id="page-article-list">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><router-link to="/index">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/index/articleList">文章管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <table-article-list></table-article-list>
  </div>
</template>

<script>
  import tableArticleList from '../table-articlelist';
  export default {
    name: 'page-article-list',
    components: {
      tableArticleList
    }
  }
</script>
