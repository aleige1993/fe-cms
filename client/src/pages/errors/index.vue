<template>
  <div id="page-errors">
    <div class="content">
      <img src="./img/error-page.png">
      <p v-text="errorContent"></p>
      <div class="errors-btns">
        <button class="return-btn" type="button" @click="toReturn"><i class="btn-icon"></i>返回</button>
        <!--<button class="refresh-btn" type="button" @click="toRefresh"><i class="btn-icon"></i>刷新</button>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        errorContent: '啊喔~出错啦！',
        go: this.$route.query.go || -1
      };
    },
    methods: {
      toReturn() {
        this.$router.go(this.$data.go);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #page-errors {
    width: 100%;
    height: 100%;
    position: fixed;
    & > .content {
      overflow: hidden;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 0;
      transform: translate(0, -50%);
      & img {
        display: inline-block;
        margin-bottom: 15px;
        width: 331px;
        height: 199px;
      }
      & p {
        text-align: center;
        font-size: 24px;
        line-height: 30px;
        color: #575757;
      }
      & .errors-btns {
        width: 100%;
        font-size: 0;
        text-align: center;
        line-height: 32px;
        & button {
          width: 90px;
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          color: #ffffff;
          display: inline-block;
          margin: 0;
          outline: none;
          border: 0;
          border-radius: 2px;
          margin-top: 80px;
          cursor: pointer;
          &:active {
            opacity: 0.8;
          }
          & .btn-icon {
            display: inline-block;
            height: 16px;
            vertical-align: middle;
            margin-right: 5px;
          }
          &.return-btn {
            background-color: #2db7f5;
            margin-right: 38px;
            & > i {
              width: 20px;
              background-image: url('img/icon-return.png');
            }
          }
          &.refresh-btn {
            background-color: #ff9900;
            & > i {
              width: 16px;
              background-image: url('img/icon-refresh.png');
            }
          }
        }
      }
    }
  }

</style>
