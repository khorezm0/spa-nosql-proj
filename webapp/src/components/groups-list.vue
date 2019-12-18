<template>
  <div class="groups-list">
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
        <el-table-column label="Имя" prop="firstName"></el-table-column>
        <el-table-column label="Фамлиле" prop="lastName"></el-table-column>
        <el-table-column label="Отчество" prop="middleName"></el-table-column>
        <el-table-column label="Возвраст" prop="age"></el-table-column>
        <el-table-column label="Тип учебы" prop="studType"></el-table-column>
        <el-table-column label="Группа" prop="group"></el-table-column> 
        <el-table-column align="right" width="210">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="Type to search" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
            </template>
      </el-table-column>
    </el-table>
    <div  style="margin-top: 20px;display: flex;justify-content: flex-end;">
        <el-button :disabled="!selectedElements" type="danger" @click="handleSelectionDelete">Удалить</el-button>
        Selected{{selectedElements}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, /*Prop,*/ Vue } from "vue-property-decorator";
import {Group, Student, StudentType, GroupType} from "../model/student";

@Component
export default class GroupsList extends Vue {
  //@Prop() private msg!: string;
    
    search: String = "";
    selected: any = null;

    get selectedElements(): any{
        return this.selected;
    }

    get tableData() : Array<Student> {
        let studs = new Array<Student>();
        studs = studs.concat([
            new Student("Akmal","Kamalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ", GroupType.FullTime, 1, studs)),
            new Student("Akmal","asfafw","Bahramovich",2, StudentType.Budget, 19,[], new Group("ИФСТ2", GroupType.FullTime, 2, studs)),
            new Student("Akmal","Ramalov","Bahramovich",4, StudentType.Budget, 30,[], new Group("ИФСТ3", GroupType.FullTime, 3, studs)),
            new Student("Akmal","Ramalov","Bahramovich",3, StudentType.Budget, 20,[], new Group("ИФСТ4", GroupType.FullTime, 4, studs)),
            new Student("Lolka","Ramalov","Bahramovich",3, StudentType.Commerce, 20,[], new Group("Пинж", GroupType.FullTime, 5, studs)),
            new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Commerce, 20,[], new Group("ИФСТ4", GroupType.Distancelearning, 1, studs)),
            new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Commerce, 20,[], new Group("ИФСТ3", GroupType.Distancelearning, 1, studs)),
            new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ2", GroupType.Distancelearning, 1, studs)),
            new Student("Akmal","Ramalov","aefsfdsd",5, StudentType.Budget, 20,[], new Group("ИФСТ1", GroupType.FullTime, 1, studs)),
            new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ", GroupType.FullTime, 4, studs)),
        ]);
        return studs;
    }

    get filterTableData() : Array<Student> {
        return this.tableData.filter(data => !this.search
                || (data.firstName && data.firstName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.lastName && data.lastName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.middleName && data.middleName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.age && data.age.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.studType && data.studType.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.avgRate && data.avgRate.toString().toLowerCase().includes(this.search.toLowerCase()))
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

    handleSelectionChange(index : Number, row : Number) {
        console.log(index, row);
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
