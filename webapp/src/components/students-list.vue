<template>
    <div class="stud-list">
        <h1 v-if="title && title.trim().length > 0">{{title}}</h1>
        <el-table
                empty-text="Нет данных"
                @selection-change="handleSelectionChange"
                :data="filterTableData"
                style="width: 100%"
        >
            <el-table-column
                    type="selection"
                    width="55"
                    v-if="isReturnable || isEditable"
            >
            </el-table-column>
            <el-table-column label="Имя" prop="firstName"></el-table-column>
            <el-table-column label="Фамлиля" prop="lastName"></el-table-column>
            <el-table-column label="Отчество" prop="middleName"></el-table-column>
            <el-table-column label="Возраст" prop="age"></el-table-column>
            <el-table-column label="Форма обучения" prop="studType"></el-table-column>
            <el-table-column label="Группа" prop="group" :formatter="groupFormatter"></el-table-column>
            <el-table-column label="Задолжности" prop="academObligations" :formatter='obligsToString'></el-table-column>
            <el-table-column align="right" width="210" v-if="isEditable">
                <template slot="header">
                    <el-input v-model="search" size="mini" placeholder="Поиск"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                    <el-button @click="
                   currDeleteFunction = ()=>{handleDelete(scope.$index, scope.row);};
                   deleteDialogVisible = true"
                               size="mini" type="danger">Удалить
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;display: flex;justify-content: flex-end;">
            <el-button :disabled="!selected || selected.length === 0" v-if="isEditable"
                       @click="
                   currDeleteFunction = handleSelectionDelete;
                   deleteDialogVisible = true"
                       type="danger">Удалить
            </el-button>
            <el-button type="primary" @click="handleAdd" v-if="isEditable">Добавить</el-button>
        </div>

        <el-dialog :title="formDialogTitle" :visible.sync="isAddModelDialogEnabled" width="383px">
            <el-form :model="addStudentForm">
                <el-form-item label="Имя">
                    <el-input v-model="addStudentForm.firstName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Фамилия">
                    <el-input v-model="addStudentForm.lastName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Отчество">
                    <el-input v-model="addStudentForm.middleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Возраст">
                    <el-input v-model="addStudentForm.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Средний балл">
                    <el-input v-model="addStudentForm.avgRate" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Задолжности" class="form-label-dropdown">
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

                <el-form-item label="Форма обучения" class="form-label-dropdown">
                    <el-select v-model="addStudentForm.studType" placeholder="Форма обучения">
                        <el-option value="Бюджет"></el-option>
                        <el-option value="Коммерция"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="isAddModelDialogEnabled = false">Отмена</el-button>
            <el-button type="primary" @click="sendCreate">Сохранить</el-button>
        </span>
        </el-dialog>

        <el-dialog
                id="delete-student-id"
                title="Удалить?"
                :visible.sync="deleteDialogVisible"
                top="45vh"
                width="256px">
            <span></span>
            <span slot="footer" class="dialog-footer" style="text-align: center!important;">
            <el-button @click="deleteDialogVisible = false">Отмена</el-button>
            <el-button @click="
            ()=>{
                this.deleteDialogVisible = false;
                this.currDeleteFunction();
            }" type="danger">Удалить</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Group, Student, StudentType, GroupType} from "../model/student";
    import {ApiService} from "../backservice"

    @Component
    export default class StudentsList extends Vue {
        @Prop() private title!: string;
        @Prop() private isEditable!: boolean;
        @Prop() private isReturnable!: boolean;
        @Prop() private handleChange!:string;
        //@Prop() private msg!: string;

        api: ApiService = new ApiService("http://localhost:3000");

        search: string = "";
        formDialogTitle: string = "Добавить";

        selected: any = null;
        addStudentForm: Student = new Student();
        tableChache: Array<Student> | null = null;

        isAddModelDialogEnabled: Boolean = false;
        isEditing: Boolean = false;
        deleteDialogVisible: Boolean = false;

        currDeleteFunction: Function = () => {
        };

        get tableData(): Array<Student> {
            let arr: Array<Student> = [];
            if (this.tableChache) arr = this.tableChache as Array<Student>;

            return arr;
        }

        get filterTableData(): Array<Student> {
            return (!this.tableData) ? [] : this.tableData.filter((data: Student) => !this.search
                || (data.firstName && data.firstName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.lastName && data.lastName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.middleName && data.middleName.toLowerCase().includes(this.search.toLowerCase()))
                || (data.age && data.age.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.studType && data.studType.toString().toLowerCase().includes(this.search.toLowerCase()))
                || (data.avgRate && data.avgRate.toString().toLowerCase().includes(this.search.toLowerCase()))
            );
        }

        mounted(): void {
            this.loadTable();
        }
        groupFormatter(s:Student):string{
            if(s.group && s.group.name){
                return s.group.name;
            }
            return "";
        }

        obligsToString(stud: Student): string {
            let text = "";
            if (stud.academObligations) {
                if (stud.academObligations.length > 1) {
                    stud.academObligations.forEach((a) => {
                        text = text.concat("«", a, "», ");
                    });
                } else if (stud.academObligations.length) {
                    text = `«${stud.academObligations[0]}»`;
                } else {
                    text = "";
                }
            }
            return text;
        }

        loadTable(): void {
            this.api.getStudents((arr: Array<Student>, err: string) => {
                if (!err) {
                    let arr1: Array<Student> = [];
                    if (arr) arr1 = arr as Array<Student>;
                    this.tableChache = arr1;
                } else {
                    console.log(err);
                }
            })
        }

        sendCreate(): void {
            this.isAddModelDialogEnabled = false;
            if (!this.isEditing) {
                this.api.addNewStudent(this.addStudentForm).then(this.loadTable);
            } else {
                this.api.updateStudent(this.addStudentForm).then(this.loadTable);
            }
        }

        handleSelect(): void {
        }

        handleAdd(): void {
            this.formDialogTitle = "Добавить";
            this.isEditing = false;
            this.isAddModelDialogEnabled = true;
            this.addStudentForm = new Student();
        }

        handleEdit(index: Number, row: Student) {
            this.formDialogTitle = "Изменить";
            this.isEditing = true;
            this.isAddModelDialogEnabled = true;
            this.addStudentForm = row;
        }

        handleDelete(index: Number, row: Student | null) {
            if (row) {
                let id = row._id;
                if (id) {
                    this.api.deleteStudent(id).then(this.loadTable);
                }
            }
            else {
                console.log("wtf");
            }
        }

        async handleSelectionDelete(val: number): Promise<void> {
            let arr = this.selected.map((x: Student) => x);
            for (const s of arr) {
                let id = s._id;
                if (id) {
                    await this.api.deleteStudent(id);
                }
            }

            this.loadTable();
        }

        handleSelectionChange(rows: any) {
            this.selected = rows;
            this.$emit('students-selection-changed', rows);
        }
    }
</script>

<style>
    #delete-student-id .el-dialog__body {
        padding: 8px;
    }

    .form-label-dropdown label {
        min-width: 122px;
        text-align: left;
    }
</style>

<style scoped>
    .stud-list {
        width: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
</style>
