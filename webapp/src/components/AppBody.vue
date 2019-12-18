<template>
  <div class="hello">
    <h1>{{ kek.firstName }}</h1>
  </div>
</template>

<script>
import Vue from "vue"
import {Group, Student, StudentType, GroupType} from "../model/student";

export default Vue.extend({
    name: 'AppBody',
    props: {
        msg: String
    },
    computed: {
        kek : ()=>{
            return new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ", GroupType.FullTime, 1, null));
        }
    }
})
</script>

<style scoped>

</style>
