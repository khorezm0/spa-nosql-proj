<template>
  <div class="top-bar">
  <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
    <el-menu-item index="/">Студенты</el-menu-item>
    <el-menu-item index="/groups" >Группы</el-menu-item>
    <!--<el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>-->
  </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, /*Prop,*/ Vue } from 'vue-property-decorator';

@Component
export default class topbar extends Vue {
  //@Prop() private msg!: string;
  handleSelect() : void {}
}
</script>

<style scoped>
    .top-bar{
        width: 100%;
    }
</style>
