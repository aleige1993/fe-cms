<template>
  <div id="page-home">
    <!--<div class="qrcode">-->
      <!--<div v-if="qrCodeUrl">-->
        <!--<p><img :src="qrCodeUrl" alt=""></p>-->
        <!--<p><a target="_blank" :href="qrCodeUrl">点击下载商户二维码</a></p>-->
      <!--</div>-->
      <!--<p v-else>欢迎进入商户服务平台</p>-->
    <!--</div>-->
    <!--<h1>欢迎进入颂车商户服务平台</h1>-->
    <!--<i-row :gutter="24">-->
      <!--<i-col span="12">-->
        <!--<i-card>-->
          <!--<p slot="title" class="card-title list">进件统计</p>-->
          <!--&lt;!&ndash;<span slot="extra">今日还款成功数：120</span>&ndash;&gt;-->
          <!--<div class="chart-content">-->
            <!--<vue2-highcharts :options="todayDutyChartsOptions" ref="paybackChart"></vue2-highcharts>-->
          <!--</div>-->
        <!--</i-card>-->
      <!--</i-col>-->
      <!--<i-col span="12">-->
        <!--<i-card>-->
          <!--<p slot="title" class="card-title clock">代办任务</p>-->
          <!--<a href="#" slot="extra">更多 <Icon type="ios-arrow-right"></Icon></a>-->
          <!--<ul>-->
          <!--</ul>-->
        <!--</i-card>-->
      <!--</i-col>-->
    <!--</i-row>-->

    <!--<i-row :gutter="24">-->
      <!--<i-col span="24">-->
        <!--<i-card>-->
          <!--<p slot="title" class="card-title alert">消息列表</p>-->
          <!--<a href="#" slot="extra">更多 <Icon type="ios-arrow-right"></Icon></a>-->
          <!--<div class="msg-list">-->
            <!--<ul>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</i-card>-->
      <!--</i-col>-->
    <!--</i-row>-->
  </div>
</template>
<script>
//  import Topbar from '@/pages/common/top-bar';
//  import LeftNav from '@/pages/common/left-nav';
//  import Topnav from '@/pages/common/top-nav';
//  import VueHighcharts from 'vue2-highcharts';
//  import CircleProgress from '@/components/circle-progress';
//  import PTModal from '@/components/bs-modal';
  // import {} from '@/assets/js/highcharts-more.js';
//  import ChartOptions from './chartOptions';
  export default {
    name: 'pageHome',
    data() {
      return {
//        id: 'circle-first',
//        todayDutyChartsOptions: ChartOptions.todayDutyChartsOptions,
//        circleProgressOptions: ChartOptions.circleProgressOptions
      };
    },
    components: {
//      'vue2-highcharts': VueHighcharts,
//      CircleProgress,
    },
    computed: {
      qrCodeUrl() {
//        let merchantInfo = this.$userLogin.getLoginInfo().merchantInfo;
//        if (merchantInfo) {
//          return merchantInfo.qrCodeUrl;
//        }
//        return '';
      }
    }
  };
</script>
<style lang="scss" scoped>
  .qrcode {
    margin-top: 60px;
    text-align: center;
    p {
      font-size: 16px;
    }
  }
  .ivu-row{
    margin-bottom: 20px;
  }
  .card-title{
    padding-left: 22px;
    &.msg{
      background: url('img/icon-msg.png') left center no-repeat;
    }
    &.alert{
      background: url('img/icon-alert.png') left center no-repeat;
    }
    &.list{
      background: url('img/icon-list.png') left center no-repeat;
    }
    &.clock{
      background: url('img/icon-clock.png') left center no-repeat;
    }
  }
  .msg-list{
    padding: 10px 10px;
    ul{
      li{
        height: 34px;
        a{
          display: block;
          height: 34px;
          line-height: 34px;
//          @include single-ellipsis;
        }
      }
    }
  }
  .chart-number{
    margin-top: 32px;
    p{
      margin-bottom: 14px;
//      @include single-ellipsis;
      &:last-child{
        margin-bottom: 0
      }
    }
  }
</style>
