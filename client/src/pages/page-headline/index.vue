
<template>
  <div id="page-headline-list">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><router-link to="/index">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/index/headlineList">头条管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item>头条列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="element-search">
      <el-button size="mini" type="primary" @click="addTableList">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="author"  width="100" label="作者"></el-table-column>
      <el-table-column prop="url"  width="280" label="文章链接">
        <template slot-scope="scope">
          <a target="_blank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate"  width="180" label="创建时间"></el-table-column>
      <el-table-column prop="gmtUpdate"  width="180" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editTableList(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTableList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      width="700px"
      :title="isAdd ? '添加头条' : '编辑头条'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
        <el-form-item v-if="form.type === 1" label="选择文章" prop="articleId">
          <div style="display: flex">
            <el-input style="margin-right: 10px" v-model="form.articleName" auto-complete="off"></el-input>
            <input type="hidden" v-model="form.articleId"/>
            <el-button @click="dialogTableVisible = true" type="primary">选择</el-button>
            <!--<el-button type="danger">取消</el-button>-->
          </div>
        </el-form-item>
        <el-form-item label="使用外部链接" prop="url">
          <div style="display: flex">
            <el-input :disabled="form.type === 1" style="margin-right: 10px"  v-model="form.url" auto-complete="off"></el-input>
            <el-button v-if="form.type === 1" type="primary" @click="form.type = 2">使用</el-button>
            <el-button v-if="form.type === 2" type="primary" @click="form.type = 1">不使用</el-button>
          </div>
        </el-form-item>
        <el-form-item label="封面">
          <el-upload
            :action="this.$config.HTTPBOSSURL + '/common/upload'"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <div v-if="!form.coverPhotoUrl">
              <el-button size="mini" type="primary">点击上传</el-button>
            </div>
            <img v-else="" height="90" :src="form.coverPhotoUrl" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input  placeholder="" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="发布终端类型" prop="terminal">
          <el-select v-model="form.terminal" placeholder="请选择">
            <el-option v-for="item in terminalTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.terminal" label="终端项目" prop="appType">
          <el-radio-group v-model="form.appType">
            <el-radio v-if="form.terminal === 1" v-for="item in appTypeList" :key="item.value" :label="item.value">{{item.text}}</el-radio>
            <el-radio v-if="form.terminal === 2" v-for="item in pcTypeList" :key="item.value" :label="item.value">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用" prop="isUsed">
          <el-radio-group v-model="form.isUsed">
            <el-radio label="1" name="type">启用</el-radio>
            <el-radio label="2" name="type">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm" :loading="loading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      width="900px"
      title="选择文章"
      :visible.sync="dialogTableVisible"
      :close-on-click-modal="false">
      <table-article-list :selectTable="true" @on-select="getSelectRow"></table-article-list>
    </el-dialog>
  </div>
</template>

<script>
  import tableArticleList from '../page-article/table-articlelist';
  export default {
    name: 'page-headline-list',
    data() {
      return {
        rules: {
//          title: {required: true, message: '标题不能为空', trigger: 'blur' },
//          author: {required: true, message: '作者不能为空', trigger: 'blur' },
//          content: {required: true, message: '内容不能为空', trigger: 'blur' }
        },
        tableData: [],
        isAdd: true,
        dialogFormVisible: false,
        form: {
          type: 1,
          articleId: '',
          articleName: '',
          coverPhotoUrl: '',
          appType: []
        },
        loading: false,
        dialogTableVisible: false,
        terminalTypeList: [],
        appTypeList: [],
        pcTypeList: []
      }
    },
    components: {
      tableArticleList
    },
    watch: {
      'form.type'() {
        this.$data.form.articleId = '';
        this.$data.form.articleName = '';
      },
      'form.terminal'() {
        this.$data.form.appType = [];
      }
    },
    methods: {
      getSelectRow(row) {
        this.$data.form.articleId = row.id;
        this.$data.form.articleName = row.title;
        this.$data.form.articleUrl = row.url;
        this.$data.dialogTableVisible = false;
      },
      addTableList() {
        this.$data.isAdd = true;
//        this.$data.form = {};
        this.$data.dialogFormVisible = true;
      },
      editTableList(row) {
        this.$data.isAdd = false;
        this.$data.form = Object.assign({}, row);
        this.$data.dialogFormVisible = true;
      },
      deleteTableList(row) {
        this.$confirm(`确认删除标题为"${row.title}"的文章？`).then(async () => {
          let res = await this.$http.post('/article/articleDelete', {id: row.id});
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
          if (valid) {
            this.$data.loading = true;
            if (this.$data.form.type === 1) {
              this.$data.form.url = this.$data.form.articleUrl;
            }
            let submitUrl = this.$data.isAdd ? '/headline/headlineAdd' : '/article/articleModify';
            let res = await this.$http.post(submitUrl, {
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
        this.$data.form.coverPhotoUrl = file.body.url;
      }
    },
    mounted() {
      this.tableList();
      this.$data.terminalTypeList = this.$Tool.getEnumData('TerminalTypeEnum');
      this.$data.appTypeList = this.$Tool.getEnumData('AppProcjectEnum');
      this.$data.pcTypeList = this.$Tool.getEnumData('PcProcjetEnum');
    }
  }
</script>
