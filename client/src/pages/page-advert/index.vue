<template>
  <div id="page-advert">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/advert'}">广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>广告列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form :inline="true" :model="formadvert" class="demo-form-inline">
      <el-form-item label="">
        <el-input size="medium" v-model="formadvert.title" placeholder="搜索标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select size="medium" v-model="formadvert.isUsed" placeholder="选择状态">
          <el-option label="全部" value=""></el-option>
          <el-option
            v-for="item in this.$Tool.getEnumData('IsUsedEnum')"
            :key="item.val"
            :label="item.text"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!--<el-form-item label="">-->
      <!--<el-select size="medium" v-model="formadvert.terminal" placeholder="选择终端">-->
      <!--<el-option-->
      <!--v-for="item in terminal"-->
      <!--:key="item.val"-->
      <!--:label="item.name"-->
      <!--:value="item.val">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->

      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="medium" @click="onAdvertAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <!--<el-table-column  prop="terminal" label="适用终端" width="180">-->
      <!--<template slot-scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.terminal==1?'手机端':'电脑端' }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column prop="location" label="位置" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">位置{{ scope.row.location}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" width="300"></el-table-column>

      <el-table-column prop="url" label="链接"></el-table-column>

      <el-table-column prop="isUsed" label="状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isUsed == 1 ? '启用' : '禁止' }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="操作" width="180">
        <template slot-scope="scope">
          <div v-if="scope.row.isUsed==1">
            <el-button
              size="mini"
              type="warning"
              @click="handleSee(scope, scope.row.id)">查看
            </el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope, scope.row.id)">编辑
            </el-button>
          </div>
          <div v-else>
            <el-button
              size="mini"
              type="warning"
              @click="handleSee(scope.row, scope.row.id)">查看
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row.id)">删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block ">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="Form.currentPage"
        :page-size="Form.pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="isAdd?'广告页添加':'广告页修改'" :visible.sync="dialogFormVisible">
      <el-form size="medium" :model="Form" label-width="80px" :rules="rules" ref="Form" class="demo-ruleForm">
        <el-form-item label="位置" prop="location">
          <el-select size="medium" v-model="Form.location" placeholder="请选择位置">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input size="medium" v-model="Form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="imageUrl">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            :action="this.$config.HTTPOPENAPIURL + '/openapi/common/file/upload'"
            :headers="{'appId': this.$config.HTTPHEADER_APPID,'version': this.$config.HTTPHEADER_APPVERSION,'sign': this.$config.HTTPHEADER_APPSIGN}"
            :data="{'message': '{}'}"
            :name="'files'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="Form.imageUrl" :src="Form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus  avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="外链URL" prop="url" v-if="Form.isOutUrl==1||Form.isOutUrl==''">
          <el-input style="width: 85%" size="medium" v-model="Form.url" placeholder="请输入URL"></el-input>
          <el-button style="width: 14%" type="primary" @click="changIsUrl(2)"> 不使用</el-button>
        </el-form-item>

        <el-form-item label="外链URL" prop="" v-if="Form.isOutUrl==2">
          <el-input style="width: 85%" size="medium" :disabled="Form.isOutUrl==2" placeholder="请输入URL"></el-input>
          <el-button style="width: 14%" type="primary" @click="changIsUrl(1)">使用</el-button>
        </el-form-item>

        <el-form-item label="内容" prop="content" v-if="Form.isOutUrl==2">
          <editor v-if="isAdd" @change="editorContent"></editor>
          <editor v-else :editor-content="Form.content" @change="editorContent"></editor>
        </el-form-item>

        <!--<el-form-item label="*发布终端" >-->
        <!--<el-select size="medium" v-model="Form.region" placeholder="请选择终端"  >-->
        <!--<el-option label="app" value="1"></el-option>-->
        <!--<el-option label="pc" value="2"></el-option>-->
        <!--</el-select>-->
        <!--<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
        <!--<div style="margin: 15px 0;"></div>-->
        <!--<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
        <!--<el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <el-form-item label="是否启用" prop="isUsed">
          <el-radio-group v-model="Form.isUsed">
            <el-radio name="type" v-for="item in this.$Tool.getEnumData('IsUsedEnum')" :key="item.value" :label="item.value" :value="item.value">
              {{item.text}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="resetForm('Form')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitData('Form')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Editor from '@/components/wangeditor';

  export default {
    name: "pageAdvert",
    components: {
      Editor
    },
    data() {
      return {
        rules: {
          location: [
            {required: true, message: '请选择广告位置', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传图片', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入内容', trigger: 'blur'}
          ],
          isUsed: [
            {required: true, message: '请选择是否开启', trigger: 'change'}
          ],
          url: [
            {required: true, message: '请输入外链接', trigger: 'blur'}
          ]
        },
        isouturl: true,
        imageUrl: '',
        isAdd: true,
        loading: false,
        total:100,
        Form: {
          id: '',
          location: '',
          title: '',
          imageUrl: '',
          url: '',
          content: '',
          isUsed: '',
          createrId: this.$userLogin.getLoginInfo().userId,
          existLocationId: '',
          isOutUrl: 1,
          autoUrl: '',
          currentPage:1,
          pageSize:10
        },
        dialogFormVisible: false,
        tableData: [],
        formadvert: {
          title: "",
          isUsed: "",
//        terminal: ""
        }
      };
    },
    methods: {
      handleCurrentChange(val){
        this.getAdvert();
      },
      changIsUrl(index) {
        this.$data.Form.isOutUrl = index;
        this.$data.Form.url = '';
      },
      resetForm() {
        this.$refs.Form.resetFields();
        this.$refs.upload.clearFiles();
        this.$data.dialogFormVisible = false;
      },
      async onSubmit() {
        this.$data.Form.currentPage = 1;
        this.getAdvert();
      },
      onAdvertAdd() {
        this.$data.isAdd = true;
        this.$data.dialogFormVisible = true;
        this.$nextTick(() => {
          this.$refs.Form.resetFields();
          this.$refs.upload.clearFiles();
        });
      },
      handleAvatarSuccess(res, file) {
        this.$data.Form.imageUrl = file.response.body.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp' || 'image/jpg' || 'image/gif';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片格式不正确!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      editorContent(content) {
        this.$data.Form.content = content;
      },

      handleSee(data){
        window.open(data.url);
      },
      handleEdit(data, id) {
        if (id) {
          this.$data.isAdd = false;
          this.$data.dialogFormVisible = true;
          this.$nextTick(async () => {
            this.$refs.Form.resetFields();
            let res = await this.$http.post('/advert/advertList', {'id': id});
            if (res.success) {
              this.$data.Form = res.body;
              this.$data.Form.currentPage = 1;
              this.$data.Form.pageSize = 10;
            }
          });
        }
      },
      async submitForm() {
        this.$data.loading = true;
        let face = this.$data.isAdd ? '/advert/advertAdd' : '/advert/advertUpdate';
        if (this.$data.Form.existLocationId) {
          let resupdata = await this.$http.post('/advert/advertUpdateLocation', {
            location: this.$data.Form.existLocationId,
            isUsed: 2
          });
        }
        if (this.$data.Form.isOutUrl == "2") {
          this.$data.Form.autoUrl = window.location.origin + '/#/index/advertDetail?noaction=true&id=';
        }
        this.$data.Form.id = this.$data.isAdd ? '' : this.$data.Form.id;
        let res = await this.$http.post(face, this.$data.Form);
        if (res.success) {
          this.$data.dialogFormVisible = false;
          this.$data.Form.isOutUrl = 1;
          this.$notify.success({
            title: '提示',
            message: this.$data.isAdd ? '添加成功' : '修改成功'
          });
          this.getAdvert();
        }
        this.$data.loading = false;
      },
      submitData() {
        this.$refs.Form.validate(async (valid) => {
          if (valid) {
            let res = await this.$http.get('/advert/existLocation', {location: this.$data.Form.location});
            if (res.success && res.body) {
              this.$confirm(`该位置已经占用，是否覆盖？`).then(() => {
                this.$data.Form.existLocationId = res.body.location;
                this.submitForm();
              }).catch(() => {
              });
            } else {
              this.submitForm();
            }
          }
        });
      },
      async getAdvert() {
        console.log(this.$data.Form);
        let data = {
          currentPage:this.$data.Form.currentPage,
          pageSize:this.$data.Form.pageSize,
          title:this.$data.formadvert.title,
          isUsed:this.$data.formadvert.isUsed
        }

        let res = await  this.$http.post('/advert/advertList',data);
        if (res.success) {
          this.$data.total = res.body.count;
          this.$data.tableData = res.body.rows;
        }
      },
       handleDelete(index, id) {
        this.$confirm(`确定删除此条数据吗？`).then(async() => {
          let res = await  this.$http.post('/advert/advertDelete', {'id': id});
          if (res.success && res.body) {
            this.$notify({
              title: '提示',
              message: '删除成功！',
              type: 'success'
            });
            this.getAdvert();
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });



      }
    },
    mounted() {
      this.getAdvert();
    }
  };
</script>
<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #333;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    border: 1px dashed #333;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 100px;
    display: block;
  }
</style>


