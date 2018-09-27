<template>
  <div ref="editor"></div>
</template>
<script>
  import Editor from 'wangeditor';
  let editor = null;
  export default {
    name: 'editor',
    data() {
      return {
      };
    },
    props: {
      editorContent: {
        type: String,
        default: '',
        required: false
      }
    },
    methods: {
      initEditor() {
        editor = new Editor(this.$refs.editor);
        editor.customConfig.debug = true;
        // 自定义菜单配置
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'fontSize',  // 字号
          'fontName',  // 字体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'link',  // 插入链接
//          'list',  // 列表
          'justify',  // 对齐方式
//          'quote',  // 引用
//          'emoticon',  // 表情
          'image',  // 插入图片
//          'table',  // 表格
          'video',  // 插入视频
//          'code',  // 插入代码
          'undo',  // 撤销
          'redo'  // 重复
        ];
        editor.customConfig.uploadImgServer = this.$config.HTTPBOSSURL + '/common/upload';
        editor.customConfig.uploadFileName = 'file';
        editor.customConfig.uploadImgHooks = {
          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          customInsert(insertImg, res, editor) {
            if (res.success) {
              insertImg(res.body.url);
            }
          }
        };
        let _this = this;
        editor.customConfig.onchange = (html) => {
          _this.$emit('change', html);
        };
        editor.create();
        editor.txt.html(this.editorContent);
      }
    },
    watch: {
      'editorContent'() {
        editor.txt.html(this.editorContent);
      }
    },
    mounted() {
      this.initEditor();
    }
  };
</script>
