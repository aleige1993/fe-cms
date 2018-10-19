
<template>
  <div id="page-headline-list">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><router-link to="/index">首页</router-link></el-breadcrumb-item>
        <el-breadcrumb-item><router-link to="/index/columnList">栏目管理</router-link></el-breadcrumb-item>
        <el-breadcrumb-item>栏目列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
      <el-form-item label="栏目名称">
        <el-input v-model="searchForm.name" placeholder=""></el-input>
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
      <el-table-column prop="name" label="栏目名称" width="180"></el-table-column>
      <el-table-column prop="isDefault" label="类型" width="180">
        <template slot-scope="scope">
          <span>{{getEnumTextByValue(isDefaultEnum, scope.row.isDefault)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sequence"  width="180" label="排序"></el-table-column>
      <!--<el-table-column prop="gmtCreate"  width="180" label="创建时间"></el-table-column>-->
      <!--<el-table-column prop="gmtUpdate"  width="180" label="更新时间"></el-table-column>-->
      <el-table-column prop="isUsed" label="状态">
        <template slot-scope="scope">
          <span>{{getEnumTextByValue('IsUsedEnum', scope.row.isUsed)}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-if="scope.row.isDefault === 2" slot-scope="scope">
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
      width="500px"
      :title="isAdd ? '添加栏目' : '编辑栏目'"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" size="mini">
        <el-form-item label="栏目名称" prop="name">
          <el-input  placeholder="" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-input  placeholder="" v-model="form.sequence"></el-input>
        </el-form-item>
        <el-form-item v-if="form.isDefault !== 1" label="是否启用" prop="isUsed">
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

  </div>
</template>

<script>
  export default {
    name: 'page-headline-list',
    data() {
      return {
        rules: {
          name: {required: true, message: '栏目名称不能为空'},
          sequence: {required: true, message: '排序不能为空'},
          isUsed: {required: true, message: '请选择是否启用'},
        },
        isDefaultEnum: [{
          "text": "预设",
          "value": 1
        }, {
          "text": "自定义",
          "value": 2
        }],
        tableData: [],
        tableDataCount: 0,
        searchForm: {
          pageSize: this.$config.PAGE_SIZE
        },
        isAdd: true,
        dialogFormVisible: false,
        form: {},
        loading: false,
        tableLoading: false
      }
    },
    methods: {
      getEnumTextByValue(enumName, value) {
        return this.$Tool.getEnumTextByValue(enumName, value);
      },
      addTableList() {
        this.$data.isAdd = true;
        this.$data.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.form.resetFields();
          this.$data.form = {
            name: '',
            sequence: '',
            isUsed: null
          }
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
        this.$confirm(`确认删除名称为"${row.name}"的栏目？`).then(async () => {
          let res = await this.$http.post('/column/columnDelete', {id: row.id});
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
        this.$data.tableLoading = true;
        this.$data.searchForm.currentPage = currentPage;
        let res = await this.$http.post('/column/columnList', {
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
            this.$data.form.createrId = this.$userLogin.getLoginInfo().userNo;
            let submitUrl = this.$data.isAdd ? '/column/columnAdd' : '/column/columnModify';
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
