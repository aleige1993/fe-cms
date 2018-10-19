
<template>
  <div id="page-headline-list">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><router-link to="/index">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/index/headlineList">资讯管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item>资讯列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="栏目类型">
        <el-select style="width: 100px"  v-model="searchForm.columnType" placeholder="请选择">
          <el-option label="全部" value="">全部</el-option>
          <el-option v-for="item in columnTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="终端">
        <el-select style="width: 100px"  v-model="searchForm.terminal" placeholder="请选择">
          <el-option label="全部" value="">全部</el-option>
          <el-option v-for="item in this.$Tool.getEnumData('TerminalTypeEnum')" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="searchForm.terminal === 1"  label="">
        <el-select v-model="searchForm.appType" placeholder="请选择">
          <el-option label="全部" value="">全部</el-option>
          <el-option v-for="item in this.$Tool.getEnumData('AppProcjectEnum')" :key="item.value" :label="item.text" :value="item.value">{{item.text}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="searchForm.terminal === 2" label="">
        <el-select v-model="searchForm.pcType" placeholder="请选择">
          <el-option label="全部" value="">全部</el-option>
          <el-option  v-for="item in this.$Tool.getEnumData('PcProcjetEnum')" :key="item.value" :label="item.text" :value="item.value">{{item.text}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select style="width: 100px" v-model="searchForm.isUsed" placeholder="请选择">
          <el-option label="全部" value="">全部</el-option>
          <el-option v-for="item in this.$Tool.getEnumData('IsUsedEnum')" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchTableList">查询</el-button>
      </el-form-item>
      <el-button  size="mini" type="primary" @click="addTableList">添加</el-button>
    </el-form>
    <el-table v-loading="tableLoading" :data="tableData" border :height="this.$Tool.getTableHeight()">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="columnType" label="栏目名称" width="100">
        <template slot-scope="scope">
          <span>{{getEnumTextByValue(columnTypeList, scope.row.columnType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="url"  width="180" label="详情链接">
        <template slot-scope="scope">
          <a target="_blank" :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="appType"  width="120" label="发布终端">
        <template slot-scope="scope">
          <span v-if="scope.row.terminal === 1">{{getEnumTextByValue('AppProcjectEnum', scope.row.appType)}}</span>
          <span v-if="scope.row.terminal === 2">{{getEnumTextByValue('PcProcjetEnum', scope.row.appType)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreate"  width="160" label="创建时间"></el-table-column>
      <el-table-column prop="gmtUpdate"  width="160" label="更新时间"></el-table-column>
      <el-table-column prop="isUsed" label="状态">
        <template slot-scope="scope">
          <span>{{getEnumTextByValue('IsUsedEnum', scope.row.isUsed)}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="editTableList(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteTableList(scope.row)">删除</el-button>
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
      width="700px"
      :title="isAdd ? '添加头条' : '编辑头条'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
        <el-form-item v-if="form.type === 1" label="选择文章" prop="articleId">
          <div style="display: flex">
            <el-input disabled style="margin-right: 10px" v-model="form.articleName" auto-complete="off"></el-input>
            <input type="hidden" v-model="form.articleId"/>
            <el-button @click="dialogTableVisible = true" type="primary">选择</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="form.type === 1" label="外部链接" prop="">
          <div style="display: flex">
            <el-input disabled style="margin-right: 10px"  v-model="form.outUrl" auto-complete="off"></el-input>
            <el-button type="primary" @click="changeFormType(2)">使用</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="form.type === 2" label="外部链接" prop="outUrl">
          <div style="display: flex">
            <el-input style="margin-right: 10px"  v-model="form.outUrl" auto-complete="off"></el-input>
            <el-button  type="primary" @click="changeFormType(1)">不使用</el-button>
          </div>
        </el-form-item>
        <el-form-item label="封面" prop="coverPhotoUrl">
          <el-upload
            :action="this.$config.HTTPOPENAPIURL + '/openapi/common/file/upload'"
            :headers="{'appId': this.$config.HTTPHEADER_APPID,'version': this.$config.HTTPHEADER_APPVERSION,'sign': this.$config.HTTPHEADER_APPSIGN}"
            :data="{'message': '{}'}"
            :name="'files'"
            :show-file-list="false"
            :on-success="uploadSuccess">
            <div v-if="!form.coverPhotoUrl">
              <el-button size="mini" type="primary">选择文件</el-button>
            </div>
            <img v-else="" height="90" :src="form.coverPhotoUrl" alt="">
          </el-upload>
        </el-form-item>
        <el-form-item label="标题名称" prop="title">
          <el-input  placeholder="" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="栏目类型" prop="columnType">
          <el-select v-model="form.columnType" placeholder="请选择">
            <el-option v-for="item in columnTypeList" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布终端类型" prop="terminal">
          <el-select v-model="form.terminal" placeholder="请选择">
            <el-option v-for="item in this.$Tool.getEnumData('TerminalTypeEnum')" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.terminal" label="终端项目" prop="appType">
          <el-radio-group v-if="form.terminal === 1" v-model="form.appType">
            <el-radio v-for="item in this.$Tool.getEnumData('AppProcjectEnum')" :key="item.value" :label="item.value">{{item.text}}</el-radio>
          </el-radio-group>
          <el-radio-group v-if="form.terminal === 2" v-model="form.appType">
            <el-radio v-for="item in this.$Tool.getEnumData('PcProcjetEnum')" :key="item.value" :label="item.value">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否启用" prop="isUsed">
          <el-radio-group v-model="form.isUsed">
            <el-radio name="type" v-for="item in this.$Tool.getEnumData('IsUsedEnum')" :key="item.value" :label="item.value" :value="item.value">
              {{item.text}}
            </el-radio>
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
          articleId: {required: true, message: '请选择文章'},
          outUrl: {required: true, message: '外部链接不能为空'},
          coverPhotoUrl: {required: true, message: '请选择封面'},
          title: {required: true, message: '标题名称不能为空'},
          columnType: {required: true, message: '请选择栏目类型'},
          terminal: {required: true, message: '请选择发布终端'},
          appType: {required: true, message: '请选择终端项目'},
          isUsed: {required: true, message: '请选择是否启用'},
        },
        columnTypeList: [],
        tableData: [],
        tableDataCount: 0,
        searchForm: {
          pageSize: this.$config.PAGE_SIZE
        },
        isAdd: true,
        dialogFormVisible: false,
        form: {},
        loading: false,
        tableLoading: false,
        dialogTableVisible: false
      }
    },
    components: {
      tableArticleList
    },
    methods: {
      getEnumTextByValue(enumName, value) {
        return this.$Tool.getEnumTextByValue(enumName, value);
      },
      getSelectRow(row) {
//        this.$refs.form.resetFields();
        this.$data.form.articleId = row.id;
        this.$data.form.articleName = row.title;
        this.$data.form.articleUrl = row.url;
        this.$data.form.title = row.title;
        this.$data.dialogTableVisible = false;
      },
      changeFormType(type) {
//        this.$refs.form.resetFields();
        this.$data.form.type = type;
        this.$data.form.articleId = null;
        this.$data.form.articleName = '';
        this.$data.form.articleUrl = '';
        this.$data.form.outUrl = '';
        this.$nextTick(() => {
          this.submitForm();
        });
      },
      addTableList() {
        this.$data.isAdd = true;
        this.$data.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$data.form = {
            type: 1,
            articleId: null,
            articleName: '',
            outUrl: '',
            coverPhotoUrl: '',
            title: '',
            columnType: null,
            terminal: null,
            appType: [],
            isUsed: null
          }
        });
      },
      async editTableList(row) {
        let res = await this.$http.post('/article/articleList', {
          id: row.articleId
        });
        if (res.success) {
          if (row.type === 1) {
            row.articleName = res.body.title;
          }
          if (row.type === 2) {
            row.outUrl = row.url;
          }
          this.$data.isAdd = false;
          this.$data.dialogFormVisible = true;
          this.$nextTick(() => {
            this.$refs.form.resetFields();
            this.$data.form = Object.assign({}, row);
          });
        }
      },
      deleteTableList(row) {
        this.$confirm(`确认删除标题为"${row.title}"的头条？`).then(async () => {
          let res = await this.$http.post('/headline/headlineDelete', {id: row.id});
          if (res.success) {
            this.$notify.success({
              title: '提示',
              message: '删除成功'
            });
            this.tableList();
          }
        }).catch(() => {});
      },
      searchTableList() {
        this.tableList();
      },
      async tableList(currentPage = 1) {
        if (this.$data.searchForm.terminal === 2) {
          this.$data.searchForm.appType = this.$data.searchForm.pcType;
        }
        this.$data.tableLoading = true;
        this.$data.searchForm.currentPage = currentPage;
        let res = await this.$http.post('/headline/headlineList', {
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
            if (this.$data.form.type === 1) {
              this.$data.form.url = this.$data.form.articleUrl;
            }
            if (this.$data.form.type === 2) {
              this.$data.form.url = this.$data.form.outUrl;
            }
            this.$data.form.createrId = this.$userLogin.getLoginInfo().userNo;
            let submitUrl = this.$data.isAdd ? '/headline/headlineAdd' : '/headline/headlineModify';
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
        this.$data.form.coverPhotoUrl = file.data[0];
      },
      async getColumnTypeList() {
        let res = await this.$http.post('/column/columnList', {
          isUsed: 1
        });
        if (res.success) {
          this.$data.columnTypeList = res.body.rows.map(item => {
            item.text = item.name;
            item.value = item.id;
            return item;
          });
        }
      }
    },
    mounted() {
      this.tableList();
      this.getColumnTypeList();
    }
  }
</script>
