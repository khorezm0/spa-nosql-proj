<template>
  <div id="app">
    <topbar/>
    <groups-list title="Группы"/>
    <students-list title="Студенты" :isEditable="true" :isReturnable="true"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Topbar from './components/topbar.vue';
import GroupsList from './components/groups-list.vue';
import StudentsList from './components/students-list.vue';

@Component({
  components: {
    Topbar,
    GroupsList,
    StudentsList
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
