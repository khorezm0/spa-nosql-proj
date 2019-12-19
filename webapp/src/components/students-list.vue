<template>
  <div class="stud-list">
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
        <el-table-column label="Имя" prop="firstName"></el-table-column>
        <el-table-column label="Фамлиле" prop="lastName"></el-table-column>
        <el-table-column label="Отчество" prop="middleName"></el-table-column>
        <el-table-column label="Возвраст" prop="age"></el-table-column>
        <el-table-column label="Тип учебы" prop="studType"></el-table-column>
        <el-table-column label="Группа" prop="group"></el-table-column> 
        <el-table-column align="right" width="210">
            <template slot="header" >
                <el-input v-model="search" size="mini" placeholder="Поиск" />
            </template>
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Удалить</el-button>
            </template>
      </el-table-column>
    </el-table>
    <div  style="margin-top: 20px;display: flex;justify-content: flex-end;">
        <el-button type="primary" @click="isAddModelDialogEnabled = true">Добавть</el-button>
        <el-button :disabled="!selectedElements || selectedElements.length == 0" type="danger" @click="handleSelectionDelete">Удалить</el-button>
    </div>

    <el-dialog title="Добавление" :visible.sync="isAddModelDialogEnabled">
        <el-form :model="addStudentForm">
            <el-form-item label="Имя">
                <el-input v-model="addStudentForm.firstName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Фамилие">
                <el-input v-model="addStudentForm.lastName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Отчество">
                <el-input v-model="addStudentForm.middleName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Возвраст">
                <el-input v-model="addStudentForm.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Средний балл">
                <el-input v-model="addStudentForm.avgRate" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Задолжности">
                <el-select
                    v-model="addStudentForm.academObligations"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    empty-text="Нет записей"
                    no-data-text="Нет записей"
                    placeholder="Добавить предмет"
                    loading-text="Загрузка"
                    no-match-text="Нет совпадений"
                    >
                    <el-option
                        v-for="item in addStudentForm.academObligations"
                        :key="item"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Форма обучения">
                <el-select v-model="addStudentForm.studType" placeholder="Форма обучения">
                    <el-option value="Бюджет"></el-option>
                    <el-option value="Коммерция"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isAddModelDialogEnabled = false">Cancel</el-button>
            <el-button type="primary" @click="sendCreate">Confirm</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {Group, Student, StudentType, GroupType} from "../model/student";
import {ApiService} from "../backservice"

@Component
export default class StudentsList extends Vue {
  @Prop() private title!: string;
  //@Prop() private msg!: string;
    
    search: String = "";
    selected: any = null;
    isAddModelDialogEnabled : Boolean = false;
    addStudentForm : Student = new Student();
    api : ApiService = new ApiService("http://localhost:3000");
    tableChache : Array<Student> | null = null;

    get selectedElements(): any{
        return this.selected;
    }

    set selectedElements(value:any){
        this.selected = value;
    }

    get tableData() : Array<Student> {
        //let studs = new Array<Student>();
        // studs = studs.concat([
        //     new Student("Akmal","Kamalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ", GroupType.FullTime, 1, studs)),
        //     new Student("Akmal","asfafw","Bahramovich",2, StudentType.Budget, 19,[], new Group("ИФСТ2", GroupType.FullTime, 2, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",4, StudentType.Budget, 30,[], new Group("ИФСТ3", GroupType.FullTime, 3, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",3, StudentType.Budget, 20,[], new Group("ИФСТ4", GroupType.FullTime, 4, studs)),
        //     new Student("Lolka","Ramalov","Bahramovich",3, StudentType.Commerce, 20,[], new Group("Пинж", GroupType.FullTime, 5, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Commerce, 20,[], new Group("ИФСТ4", GroupType.Distancelearning, 1, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Commerce, 20,[], new Group("ИФСТ3", GroupType.Distancelearning, 1, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ2", GroupType.Distancelearning, 1, studs)),
        //     new Student("Akmal","Ramalov","aefsfdsd",5, StudentType.Budget, 20,[], new Group("ИФСТ1", GroupType.FullTime, 1, studs)),
        //     new Student("Akmal","Ramalov","Bahramovich",5, StudentType.Budget, 20,[], new Group("ИФСТ", GroupType.FullTime, 4, studs)),
        // ]);
        return this.tableChache;
    }

    get filterTableData() : Array<Student> {
        return (!this.tableData) ? new Array<Student>() : this.tableData.filter(data => !this.search
                || (data.firstName && data.firstName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.lastName && data.lastName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.middleName && data.middleName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.age && data.age.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.studType && data.studType.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.avgRate && data.avgRate.toString().toLowerCase().includes(this.search.toLowerCase()))
        );
    }

    mounted():void{
        this.api.getStudents((arr,err)=>{
            if(!err){
                this.tableChache = arr;
            }else{
                console.log(err);
            }
        })
    }

    sendCreate(): void{
        this.isAddModelDialogEnabled = false;
        this.api.addNewStudent(this.addStudentForm);
    }

    handleSelect(): void {}

    handleEdit(index : Number, row : Number) {
        console.log(index, row);
    }

    handleDelete(index : Number, row : Number) {
        console.log(index, row);
    }

    handleSelectionDelete(val : any):void {
    }

    handleSelectionChange(rows:any) {
        this.selectedElements = rows;
    }
}
</script>

<style scoped>
    .stud-list {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
