<template>
  <div class="top-bar">
  <el-menu
          :default-active="'1'"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-submenu index="2">
      <template slot="title">Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .top-bar{
        width: 100%;
    }
</style>
