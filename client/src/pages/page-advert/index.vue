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
          <el-option
            v-for="item in isUsed"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-select size="medium" v-model="formadvert.terminal" placeholder="选择终端">
          <el-option
            v-for="item in terminal"
            :key="item.val"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button size="medium" type="primary" @click="onSubmit">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button size="medium"     @click="onAdvertAdd">新增</el-button>
      </el-form-item>  
    </el-form>

    <el-table :data="tableData"  border  style="width: 100%">
         <el-table-column  prop="terminal" label="适用终端" width="180">
            <template slot-scope="scope"> 
              <span style="margin-left: 10px">{{ scope.row.terminal==1?'手机端':'电脑端' }}</span>
            </template>
          </el-table-column>

           <el-table-column  prop="location" label="位置" width="180">
            <template slot-scope="scope"> 
              <span style="margin-left: 10px">位置{{ scope.row.location}}</span>
            </template>
          </el-table-column>

           <el-table-column  prop="title" label="标题" width="300"> </el-table-column>

           <el-table-column  prop="url" label="链接" > </el-table-column>

           <el-table-column  prop="isUsed" label="状态" width="180">
            <template slot-scope="scope"> 
              <span style="margin-left: 10px">{{ scope.row.isUsed==1?'启用':'禁止' }}</span>
            </template>
          </el-table-column> 

          <el-table-column  prop="id" label="操作" width="180"> 
           <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
            </template>
         </el-table-column>  
    </el-table> 

      <el-dialog title="广告页新增" :visible.sync="dialogFormVisible">
        <el-form :model="addForm" label-width="80px">
          <el-form-item label="*位置" >
             <el-select size="medium" v-model="addForm.region" placeholder="请选择位置"  >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*标题" >
            <el-input size="medium" v-model="addForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="*上传图片" >
             <el-upload
                class="avatar-uploader"
                :action="this.$config.HTTPBOSSURL + '/common/upload'"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>

          <el-form-item label="外链URL" >
            <el-input size="medium" v-model="addForm.title" placeholder="请输入URL"></el-input>
          </el-form-item>

          <el-form-item label="*内容" >
             <editor v-if="isAdd" @change="editorContent"></editor>
              <editor v-else :editor-content="form.content" @change="editorContent"></editor>

          </el-form-item>

        </el-form>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div> -->
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
      imageUrl: '',
      isAdd: true,
      addForm:{

      },
      dialogFormVisible:true,
      tableData: [
        {
          id: 1,
          terminal: 1,
          location: 1,
          title: "标题123123",
          url: "123123123",
          isUsed: 1
        }
      ],
      formadvert: {
        title: "",
        isUsed: "",
        terminal: ""
      },
      terminal: [
        {
          name: "移动端",
          val: 1
        },
        {
          name: "电脑端",
          val: 2
        }
      ],
      isUsed: [
        {
          name: "启用",
          val: 1
        },
        {
          name: "禁用",
          val: 2
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log(this.$data.formadvert);
    },
    onAdvertAdd() {
      console.log(1111);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'image/png'||'image/bmp'||'image/jpg'|| 'image/gif';
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片格式不正确!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {}
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


