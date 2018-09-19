<template>
  <div id="bs-collepse">
    <h3 class="bs-collepse-title" v-bind:class="{active: isOpen}" @click="toggleBody">
      <Icon v-bind:class="{active: isOpen}" type="ios-arrow-right"></Icon> {{title}}
    </h3>
    <div class="bs-collepse-body" v-show="isOpen">
      <slot>

      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'bsCollepse',
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    toggleBody() {
      this.$data.isOpen = !this.$data.isOpen;
    }
  },
  props: ['title']
};
</script>
<style lang="scss" scoped>
.bs-collepse-title{
  display: block;
  height: 32px;
  line-height: 32px;
  padding-left: 22px;
  font-size: 14px;
  border-left: 4px solid transparent;
  cursor: pointer;
  i{
    font-size: 14px;
    display: inline-block;
    transition: transform .5s;
    &.active{
      transform: rotate(90deg);
    }
  }
  &:hover{
    text-decoration: none;
    background-color: #c5dcef;
    border-left: 4px solid #2196f3;
    color: #2196f3;
  }
  &.active{

  }
}
.bs-collepse-body{
  // padding-left: 30px;
  animation-name: slideDown;
  transform-origin: top;
  animation-duration: 2s;
}
@keyframes slideDown {
  0% {
    scaleY: 0;
  }
  100%{
    scaleY: 1;
  }
}
</style>
