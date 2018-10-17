
<template>
  <div id="table-article-list">
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="searchForm.author" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTableList">查询</el-button>
      </el-form-item>
      <el-button v-if="!selectTable" size="mini" type="primary" @click="addTableList">添加</el-button>
    </el-form>
    <el-table v-loading="tableLoading" :data="tableData" border style="width: 100%" :height="this.$Tool.getTableHeight()">
      <!--<el-table-column prop="id" label="标题" width="180"></el-table-column>-->
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="author"  width="100" label="作者"></el-table-column>
      <el-table-column prop="url"  width="280" label="文章链接">
        <template slot-scope="scope">
          <a target="_blank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate"  width="180" label="创建时间"></el-table-column>
      <el-table-column prop="gmtUpdate"  label="更新时间"></el-table-column>
      <el-table-column v-if="!selectTable" fixed="right" width="180" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editTableList(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTableList(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else="" fixed="right" width="80" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="selectTableList(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="right"
      @current-change="tableList"
      layout="total, prev, pager, next, jumper"
      :current-page="this.$data.searchForm.currentPage"
      :page-size="this.$config.PAGE_SIZE"
      :total="tableDataCount">
    </el-pagination>

    <el-dialog
      width="800px"
      :title="isAdd ? '添加文章' : '编辑文章'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="abstract">
          <el-input type="textarea" placeholder="" v-model="form.abstract"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <editor :editor-content="form.content" @change="editorContent"></editor>
        </el-form-item>
        <el-form-item v-if="!isAdd" label="文章链接" prop="url">
          <a target="_blank" :href="form.url">{{form.url}}</a>
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
    name: 'page-article-list',
    data() {
      return {
        rules: {
          title: {required: true, message: '标题不能为空', trigger: 'blur' },
          author: {required: true, message: '作者不能为空', trigger: 'blur' },
          content: {required: true, message: '内容不能为空', trigger: 'blur' }
        },
        searchForm: {
          pageSize: this.$config.PAGE_SIZE
        },
        tableData: [],
        tableDataCount: 0,
        isAdd: true,
        dialogFormVisible: false,
        form: {
          title: '',
          author: '',
          abstract: '',
          content: ''
        },
        loading: false,
        tableLoading: false
      }
    },
    components: {
      Editor
    },
    props: {
      selectTable: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    methods: {
      editorContent(content) {
        this.$data.form.content = content;
      },
      addTableList() {
        this.$data.isAdd = true;
        this.$data.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.form.resetFields();
        });
      },
      editTableList(row) {
        this.$data.isAdd = false;
        this.$data.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$data.form = Object.assign({}, row);
        });
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
      selectTableList(row) {
        this.$emit('on-select', row);
      },
      searchTableList() {
        this.tableList();
      },
      async tableList(currentPage = 1) {
        this.$data.tableLoading = true;
        this.$data.searchForm.currentPage = currentPage;
        let res = await this.$http.post('/article/articleList', {
          ...this.$data.searchForm
        });
        this.$data.tableLoading = false;
        if (res.success) {
          this.$data.tableDataCount = res.body.count;
          this.$data.tableData = res.body.rows;
        }
      },
      submitForm() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.$data.loading = true;
            if (this.$data.isAdd) {
              this.$data.form.url = window.location.origin + '/#/index/articleDetail?noaction=true&id=';
            }
            this.$data.form.createrId = this.$userLogin.getLoginInfo().userNo;
            let submitUrl = this.$data.isAdd ? '/article/articleAdd' : '/article/articleModify';
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
      }
    },
    mounted() {
      this.tableList();
    }
  }
</script>
