<template>
  <div id="page-guided">
    <div class="element-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/guided'}">引导页管理</el-breadcrumb-item>
        <el-breadcrumb-item>引导页列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form :inline="true" :model="formadvert" class="demo-form-inline" size="mini">
      <el-form-item label="搜索标题">
        <el-input size="mini" v-model="formadvert.title" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="选择终端">
        <el-select size="mini" v-model="formadvert.appType" placeholder="">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in this.$Tool.getEnumData('AppProcjectEnum')" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="guidedFind">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="mini" @click="onGuidedAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%" :height="this.$Tool.getTableHeight()" >
      <el-table-column  prop="appType" label="适用终端" width="180">
      <template slot-scope="scope">
        <span v-if="scope.row.appType==1" style="margin-left: 10px"> 颂车网APP</span>
        <span v-if="scope.row.appType==2" style="margin-left: 10px"> 颂车邦APP</span>
        <span v-if="scope.row.appType==3" style="margin-left: 10px"> 出行APP</span>
        <span v-if="scope.row.appType==4" style="margin-left: 10px"> 车企源APP</span>
      </template>
      </el-table-column>

      <el-table-column prop="location" label="位置" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">位置{{ scope.row.location==1?'引导页':'启动页'}}</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" ></el-table-column>

      <el-table-column prop="isUsed" label="状态" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.isUsed == 1 ? '启用' : '禁止' }}</span>
        </template>
      </el-table-column>

      <el-table-column  prop="gmtCreate" label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gmtCreate}}</span>
        </template>
      </el-table-column>

      <el-table-column  label="操作" width="240">
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
            <div v-if="scope.row.isUsed==2">
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
              <el-button
                size="mini"
                type="danger"
                @click="guidedDel(scope.row.id)">删除
              </el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="block ">
      <el-pagination
        background
        class="right"
        @current-change="handleCurrentChange"
        :current-page.sync="Form.currentPage"
        :page-size="Form.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--新增弹窗-->
    <el-dialog :title="isAdd?'引导页添加':'引导页修改'" :visible.sync="dialogFormVisible">
      <el-form size="mini" :model="Form" label-width="80px" :rules="rules" ref="Form" class="demo-ruleForm">
        <el-form-item label="位置" prop="location">
          <el-select size="medium" v-model="Form.location" placeholder="请选择位置">
            <!--<el-option v-for="item in locationEnum" :key="item.value" :label="item.text" :value="item.value"></el-option>-->
            <el-option key="1" label="引导页" value=1></el-option>
            <el-option key="2" label="启动页" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input size="medium" v-model="Form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="上传图片" prop="imageUrl">
          <div v-show="Form.location==1||Form.location==''">
            <el-upload
              ref="multigraphUpload"
              :action="this.$config.HTTPOPENAPIURL + '/openapi/common/file/upload'"
              :headers="{'appId': this.$config.HTTPHEADER_APPID,'version': this.$config.HTTPHEADER_APPVERSION,'sign': this.$config.HTTPHEADER_APPSIGN}"
              :data="{'message': '{}'}"
              :name="'files'"
              list-type="picture-card"
              :limit='num'
              :file-list="fileList"
              accept=".png"
              :on-success="multigraphSuccess"
              :before-upload="multigraphBefore"
              :on-remove="multigraphRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>

          <div v-show="Form.location==2">
            <el-upload
              ref="singleUpload"
              class="avatar-uploader"
              :action="this.$config.HTTPOPENAPIURL + '/openapi/common/file/upload'"
              :headers="{'appId': this.$config.HTTPHEADER_APPID,'version': this.$config.HTTPHEADER_APPVERSION,'sign': this.$config.HTTPHEADER_APPSIGN}"
              :data="{'message': '{}'}"
              :name="'files'"
              :show-file-list="false"
              :on-success="singleSuccess"
              :before-upload="singleBefore">
              <img v-if="imageSingle" :src="imageSingle" class="avatar">
              <i v-else class="el-icon-plus  avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="发布终端" prop="appType" >
          <el-select size="medium" v-model="Form.appType" placeholder="请选择终端"  >
            <el-option v-for="item in this.$Tool.getEnumData('AppProcjectEnum')" :key="item.value" :label="item.text" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否启用" prop="isUsed">
          <el-radio-group v-model="Form.isUsed">
            <el-radio name="type" v-for="item in this.$Tool.getEnumData('IsUsedEnum')" :key="item.value" :label="item.value" :value="item.value">
              {{item.text}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="medium" @click="resetForm">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitData">确 定</el-button>
      </div>
    </el-dialog>

    <!--查看页面-->
    <el-dialog   title="查看详情" :visible.sync="outerVisible">
      <el-form ref="form"  size="mini" label-width="100px">
        <el-form-item label="位置:">
            <span>{{detail.location==1?'引导页':'启动页'}}</span>
        </el-form-item>
        <el-form-item label="标题:">
          <span>{{detail.title}}</span>
        </el-form-item>

        <el-form-item label="图片展示:">
           <img class="imageUrl"  @click="changeImg(item,index)"  v-for="(item,index) in detail.imageUrl" :src="item"/>
          <el-dialog
            width="40%"
            :visible.sync="innerVisible"
            center
            append-to-body>
            <div  style="text-align: center">
              <img width="100%" :src="imgIndex"/>
            </div>
          </el-dialog>
        </el-form-item>

        <el-form-item label="发送终端:">
          <span v-if="detail.appType==1">颂车网APP</span>
          <span v-if="detail.appType==2">颂车邦APP</span>
          <span v-if="detail.appType==3">出行APP</span>
          <span v-if="detail.appType==4">车企源APP</span>
        </el-form-item>

        <el-form-item label="是否启用:">
          <span>{{detail.isUsed==1?'启用':'禁用'}}</span>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "pageGuided",
    data() {
      return {
        rules:{//效验
          location: [
            {required: true, message: '请选择位置', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          imageUrl: [
            {required: true, message: '请上传图片', trigger: 'blur'}
          ],
          isUsed: [
            {required: true, message: '请选择是否开启', trigger: 'change'}
          ],
          appType: [
            {required: true, message: '请选择终端', trigger: 'change'}
          ]
        },
        total:100,//总页数
        num:6,//最多可上传6张
        imgIndex:'',//默认查看图片索引
        innerVisible:false,//查看图片详情
        outerVisible:false,//查看详情是否显示
        dialogFormVisible:false,// dialogFormVisible true展示 falsey隐藏
        isAdd:true,//isAdd true添加 false修改
        loading:false,//点击提交load
        appType:[//枚举终端
          {name:'颂车网APP',val:1},
          {name:'颂车邦APP',val:2},
          {name:'出行APP',val:3},
          {name:'车企源APP',val:4}
        ],
        formadvert:{ //筛选条件
          title:'',
          appType:''
        },
        tableData:[ //tableData
          {
            'appType':'颂车APP',
            'isUsed':1,
            'gmtCreate':'2018-12-12',
            'location':1,
            'title':'标题aaaa'
          }
        ],
        imageMultigraph:'123',//多图
        fileList:[],//多图展示
        imageSingle:'',//单图
        Form:{//Form 提交数据
          location:'',
          title:'',
          imageUrl:'',
          appType:'',
          isUsed:'',
          currentPage:1,//当前页
          pageSize:this.$config.PAGE_SIZE,//页条数
          createrId:this.$userLogin.getLoginInfo().userNo
        },
        detail:'',//查看详情
        locationEnum: [{
          text: '引导页',
          value: 1
        }, {
          text: '启动页',
          value: 2
        }]
      };
    },
    methods: {
      handleCurrentChange(val){
        this.getGuidedAll();
      },
      //多图上传删除
      multigraphRemove(file, fileList) {
        this.getImageMultigraph(fileList);
      },
      //多图上传之前
      multigraphBefore(file) {
//        const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/bmp' || 'image/jpg' || 'image/gif';
//        const isLt2M = file.size / 1024 / 1024 < 5;
//
//        if (!isJPG) {
//          this.$message.error('上传头像图片格式不正确!');
//        }
//        if (!isLt2M) {
//          this.$message.error('上传头像图片大小不能超过 2MB!');
//        }
//        return isJPG && isLt2M;
      },
      //处理多图上传
      getImageMultigraph(fileList){
        let arr=[];
        fileList.map((item,index)=>{
          if(item.response){
            arr.push(item.response.data[0]);
          }else{
            arr.push(item.url);
          }
        })
        this.$data.imageMultigraph = arr.join(',');
      },
      //多图上传成功
      multigraphSuccess(res,file,fileList) {
        if(res.code == '0000'){
          this.getImageMultigraph(fileList);
        }else{
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      //单图上传之前
      singleBefore(file){
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
      //单图上传成功
      singleSuccess(res,file){
        if(res.success == 'true'){
          this.$data.imageSingle = res.data[0];
        }else{
          this.$notify.error({
            title: '错误',
            message: res.message
          });
        }
      },
      //新增
      async onGuidedAdd(){
        this.$data.dialogFormVisible = true;
        this.$data.isAdd = true;
        this.$data.Form.id = '';
        this.$nextTick(() => {
          this.$refs.Form.resetFields();
          this.$refs.multigraphUpload.clearFiles();
          this.$refs.singleUpload.clearFiles();
        });
      },
      //清空
      resetForm(){
        this.$data.fileList = [];
        this.$refs.Form.resetFields();
        this.$refs.multigraphUpload.clearFiles();
        this.$refs.singleUpload.clearFiles();
        this.$data.dialogFormVisible = false;
      },
      //点击确定
      submitData() {
        let index = this.$data.Form.location
        if(index==1){
          this.$data.Form.imageUrl = this.$data.imageMultigraph
        }else {
          this.$data.Form.imageUrl = this.$data.imageSingle
        }
        this.$refs.Form.validate(async(valid) => {
          if (valid) {
              let res = await this.$http.post('/guided/guidedLike',this.$data.Form);
            if (res.success && res.body.length >= 1){
              this.$confirm(`该位置已经占用，是否覆盖？`).then(async() => {
                let res = await this.$http.post('/guided/guidedUpdateIsUsed',{
                    'location': this.$data.Form.location,
                    'appType': this.$data.Form.appType,
                    'isUsed':2
                });
                this.submitForm();
              }).catch(() => {
              });
            } else {
              this.submitForm();
            }
            }
        });
      },
      //提交参数
     async submitForm(){
        this.$data.loading = true;
        if(this.$data.isAdd){
          this.$data.Form.id = '';
        }
        let url = this.$data.isAdd ? '/guided/GuidedAdd' : '/guided/guidedUpdate'
        let res = await this.$http.post(url,this.$data.Form);
        if(res.success && res.body){
          this.$data.dialogFormVisible = false;
          this.$data.fileList = [];
          this.$refs.Form.resetFields();
          this.$refs.multigraphUpload.clearFiles();
          this.$refs.singleUpload.clearFiles();
          this.$notify.success({
            title: '提示',
            message: this.$data.isAdd ? '添加成功' : '修改成功'
          });
          if(this.$data.isAdd){
            this.getGuidedAll();
          }else {
            this.$data.Form.id = '';
            this.$data.formadvert.title = '';
            this.$data.formadvert.appType = '';
            this.getGuidedAll();
          }

        }
       this.$data.loading = false;
      },
      //获取列表
      async getGuidedAll(){
       console.log('$data.Form',this.$data.Form);
        let res =await this.$http.post('/guided/guidedList',this.$data.Form);
        if(res.success && res.body){
          this.$data.total = res.body.count;
          this.$data.tableData = res.body.rows;
        }
      },
      //删除
       guidedDel(id){
        this.$confirm('确定删除该数据?').then(async() => {
          let res =  await  this.$http.post('/guided/guidedDelete',{
            'id':id
          })
          if(res.success){
            this.getGuidedAll();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
         }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //迷糊查询
     async guidedFind(){
          this.$data.Form = {};
          this.$data.Form.currentPage = 1;
          this.$data.Form.pageSize = this.$config.PAGE_SIZE;
         this.$data.Form.title=this.$data.formadvert.title;
         this.$data.Form.appType=this.$data.formadvert.appType;
         this.getGuidedAll();
      },
      //查看单条数据
      async handleSee(data,id){
        this.$data.detail='';
       this.$data.outerVisible = true;
       let res = await this.$http.post('/guided/guidedList',{'id':id});
       if(res.success){
          this.$data.detail = res.body;
          if(res.body.imageUrl){
            this.$data.detail.imageUrl = res.body.imageUrl.split(',');
          }
       }
      },
      //编辑内容
      async handleEdit(data,id){
        let _this = this;
        if(id){
          this.$data.isAdd = false;
          this.$data.dialogFormVisible = true;
          this.$data.fileList = [];
          let res = await this.$http.post('/guided/guidedList',{'id':id});
          if(res.success){
            let imagelist = [];
            this.$data.Form = res.body;
            this.$data.Form.currentPage = 1;
            this.$data.Form.pageSize = this.$config.PAGE_SIZE;
            if(res.body.location == 1){
              imagelist = res.body.imageUrl.split(',');
              imagelist.forEach(function (item,index) {
                _this.$data.fileList.push({'url':item})
              })
            }else if(res.body.location == 2){
              this.$data.imageSingle = res.body.imageUrl
            }
          }
        }
      },
      //查看图片详情
      changeImg(item,index){
        this.$data.innerVisible = true;
        this.$data.imgIndex = item;
      }
    },
    mounted() {
      this.getGuidedAll();
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
  .imageUrl{
    width: 170px;
    margin-right:10px;
    margin-bottom:10px;
    cursor: pointer;
  }

</style>


