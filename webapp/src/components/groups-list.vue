<template>
  <div class="groups-list">
      <h1>{{title}}</h1>
    <el-table
        empty-text="Нет данных"
        @selection-change="handleSelectionChange"
        :data="filterTableData"
      style="width: 100%"
    >
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column label="Направление" prop="name"></el-table-column>
        <el-table-column label="Курс" prop="course"></el-table-column>
        <el-table-column label="Тип" prop="groupType"></el-table-column>
        <el-table-column label="Студенты" prop="students"></el-table-column> 
        <el-table-column align="right" width="210">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Поиск" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
            </template>
      </el-table-column>
    </el-table>
    <div  style="margin-top: 20px;display: flex;justify-content: flex-end;">
        <el-button :disabled="!selectedElements || selectedElements.length == 0" type="danger" @click="handleSelectionDelete">Удалить</el-button>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Group, Student, StudentType, GroupType} from "../model/student";

@Component
export default class GroupsList extends Vue {
  @Prop() private title!: string;
    
    search: String = "";
    selected: any = null;

    get selectedElements(): any{
        return this.selected;
    }
    set selectedElements(value:any){
        this.selected = value;
    }

    get tableData() : Array<Group> {
        let studs = new Array<Group>();
        studs = studs.concat([
            new Group("ИФСТ", GroupType.FullTime, 1, new Array<Student>()), 
            new Group("ИФСТ3", GroupType.FullTime, 2, new Array<Student>()),
            new Group("ИФСТ4", GroupType.FullTime, 2, new Array<Student>()),
            new Group("ИФСТ5", GroupType.FullTime, 2, new Array<Student>()),
            new Group("ИФСТ6", GroupType.FullTime, 2, new Array<Student>())
        ]);
        return studs;
    }

    get filterTableData() : Array<Group> {
        return this.tableData.filter(
                data => !this.search
                || (data.name && data.name.toLowerCase().includes(this.search.toLowerCase()))
                || (data.course && data.course.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.groupType && data.groupType.toString().toLowerCase().includes(this.search.toLowerCase()))
        );
    }

    handleSelect(): void {}

    handleEdit(index : Number, row : Number) {
        console.log(index, row);
    }

    handleDelete(index : Number, row : Number) {
        console.log(index, row);
    }

    handleSelectionDelete(val : any):void {
        this.selected = val;
    }

    
    handleSelectionChange(rows:any) {
        this.selectedElements = rows;
    }
}
</script>

<style scoped>
    .groups-list {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
