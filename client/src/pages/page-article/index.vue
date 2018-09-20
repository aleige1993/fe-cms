
<template>
  <div id="page-conf-news">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><router-link to="/index">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/index/articleList">文章管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="element-search">
      <el-button size="mini" type="primary" @click="addTableList">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="cover" label="封面" width="180">
        <template slot-scope="scope">
          <img height="60" :src="scope.row.cover" alt=""/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime"  width="180" label="创建时间"></el-table-column>
      <el-table-column prop="modifyTime"  width="180" label="修改时间"></el-table-column>
      <el-table-column prop="index"  width="180" label="排序"></el-table-column>
      <el-table-column prop="display"  label="是否激活">
        <template slot-scope="scope">
          <span v-if="scope.row.display === '1'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="remark"  label="备注"></el-table-column>-->
      <el-table-column width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editTableList(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTableList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="800px"
      :title="isAdd ? '添加文章' : '编辑文章'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="abstract">
          <el-input type="textarea" placeholder="请输入内容" v-model="form.abstract"></el-input>
        </el-form-item>
        <!--<el-form-item label="封面">-->
          <!--<el-upload-->
            <!--:action="this.$config.HTTPBOSSURL + '/common/upload'"-->
            <!--:show-file-list="false"-->
            <!--:on-success="uploadSuccess">-->
            <!--<div v-if="!form.cover">-->
              <!--<el-button size="small" type="primary">点击上传</el-button>-->
            <!--</div>-->
            <!--<img v-else="" height="90" :src="form.cover" alt="">-->
          <!--</el-upload>-->
        <!--</el-form-item>-->
        <el-form-item label="内容" prop="content">
          <editor v-if="isAdd" @change="editorContent"></editor>
          <editor v-else="" :editor-content="form.content" @change="editorContent"></editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Editor from '@/components/wangeditor';
  export default {
    name: 'pageArticle',
    data() {
      return {
        rules: {
          title: {required: true, message: '标题不能为空'},
          author: {required: true, message: '作者不能为空'},
          content: {required: true, message: '内容不能为空'}
        },
        tableData: [],
        isAdd: true,
        dialogFormVisible: false,
        form: {
          'cover': ''
        },
        loading: false
      }
    },
    components: {
      Editor
    },
    methods: {
      editorContent(content) {
        this.$data.form.content = content;
      },
      addTableList() {
        this.$data.dialogFormVisible = true;
      },
      editTableList(row) {
        this.$data.isAdd = false;
        this.$data.form = Object.assign({}, row);
        this.$data.dialogFormVisible = true;
      },
      deleteTableList(row) {
        this.$confirm(`确认删除"${row.title}"？`).then(async () => {
//          console.log(row.id);
          let res = await this.$http.post('/conf/newsDelete', {id: row.id});
          if (res.success) {
            this.$notify.success({
              title: '提示',
              message: '删除成功'
            });
            this.tableList();
          }
        }).catch(() => {});
      },
      async tableList() {
        let res = await this.$http.get('/article/articleList', {});
        if (res.success) {
          this.$data.tableData = res.body;
        }
      },
      submitForm() {
        this.$refs['form'].validate(async (valid) => {
          console.log(valid);
          if (valid) {
            this.$data.loading = true;
            let url = this.$data.isAdd ? '/article/articleAdd' : '/conf/newsModify';
            let res = await this.$http.post(url, {
              ...this.$data.form
            });
            this.$data.loading = false;
            if (res.success) {
              this.$data.dialogFormVisible = false;
              this.$notify.success({
                title: '提示',
                message: this.$data.isAdd ? '添加成功' : '修改成功'
              });
              this.tableList();
            }
          }
        });
      },
      uploadSuccess(file) {
        this.$data.form.cover = file.body.url;
      }
    },
    mounted() {
      this.tableList();
    }
  }
</script>
