<template>
    <div class="groups-list">
        <h1>{{componentTitle}}</h1>
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
            <el-table-column label="Студенты" :formatter="studsToString">
                <template slot-scope="scope">
                    <el-button type="text" @click="addGroupForm = scope.row;isAddStudentsDialog = true;">Выбрать</el-button>
                </template>
            </el-table-column>
            <el-table-column align="right" width="210">
                <template slot="header">
                    <el-input v-model="search" size="mini" placeholder="Поиск"/>
                </template>
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Изменить</el-button>
                    <el-button @click="
                   currDeleteFunction = ()=>{handleDelete(scope.$index, scope.row);};
                   deleteDialogVisible = true"
                               size="mini" type="danger"
                    >Удалить
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px;display: flex;justify-content: flex-end;">
            <el-button :disabled="!selected || selected.length === 0" type="danger"
                       @click="
                       currDeleteFunction = handleSelectionDelete;
                       deleteDialogVisible = true"
            >Удалить
            </el-button>
            <el-button type="primary" @click="handleAdd">Добавить</el-button>
        </div>

        <el-dialog :title="formDialogTitle" :visible.sync="isAddModelDialogEnabled" width="383px">
            <el-form :model="addGroupForm">
                <el-form-item label="Направление">
                    <el-input v-model="addGroupForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Курс">
                    <el-input v-model="addGroupForm.course" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Тип" class="form-label-dropdown">
                    <el-select v-model="addGroupForm.groupType" placeholder="Форма обучения">
                        <el-option value="Очное"></el-option>
                        <el-option value="Заочное"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Студенты" class="form-label-dropdown">
                    <el-select
                            v-model="addGroupForm.students"
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
                                v-for="item in addGroupForm.academObligations"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isAddModelDialogEnabled = false">Отмена</el-button>
                <el-button type="primary" @click="sendCreate">Сохранить</el-button>
            </span>
        </el-dialog>

        <el-dialog
                id="delete-group-id"
                title="Удалить?"
                :visible.sync="deleteDialogVisible"
                width="256px"
                top="45vh"
        >
            <span></span>
            <span slot="footer" class="dialog-footer" style="text-align: center!important;">
                <el-button @click="deleteDialogVisible = false">Отмена</el-button>
                <el-button type="danger" @click="
                ()=>{
                    this.deleteDialogVisible = false;
                    this.currDeleteFunction();
                }">Удалить</el-button>
            </span>
        </el-dialog>

        <el-dialog
                id="add-students-to-group"
                title="Добавить в группу"
                :visible.sync="isAddStudentsDialog"
                width="80%"
                top="15vh"
                v-if="isAddStudentsDialog"
        >
            <span>
                <students-list v-on:students-selection-changed="addGroupSelectionChange" :isNotEditable="true" :isReturnable="true"></students-list>
            </span>
            <span slot="footer" class="dialog-footer" style="text-align: center!important;">
                <el-button @click="isAddStudentsDialog = false">Отмена</el-button>
                <el-button type="primary" @click="addToGroup">Добавить</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Group, Student, StudentType, GroupType} from "../model/student";
    import {ApiService} from "../backservice";
    import StudentsList from "./students-list.vue";

    @Component({
        components: {StudentsList}
    })
    export default class GroupsList extends Vue {
        @Prop() private title!: string;

        api: ApiService = new ApiService("http://localhost:3000");

        search: string = "";
        formDialogTitle: string = "Добавить";

        selected: any = null;
        selectedStudents: any = null;
        addGroupForm: Group = new Group();
        tableChache: Array<Group> | null = null;

        isAddModelDialogEnabled: Boolean = false;
        isEditing: Boolean = false;
        deleteDialogVisible: Boolean = false;
        isAddStudentsDialog : Boolean = false;

        currDeleteFunction: Function = () => {
        };

        get componentTitle(){
            if(this.title) return this.title;
            return "Группы";
        }

        get tableData(): Array<Group> {
            let arr: Array<Group> = [];
            if (this.tableChache) arr = this.tableChache as Array<Group>;

            return arr;
        }

        get filterTableData(): Array<Group> {
            return this.tableData.filter(
                data => !this.search
                    || (data.name && data.name.toLowerCase().includes(this.search.toLowerCase()))
                    || (data.course && data.course.toString().toLowerCase().includes(this.search.toLowerCase()))
                    || (data.groupType && data.groupType.toString().toLowerCase().includes(this.search.toLowerCase()))
            );
        }

        mounted(): void {
            this.loadTable();
        }

        addToGroup():void{
            this.isAddStudentsDialog = false;
            let lst = this.addGroupForm.students;
            if(lst){
                lst.push(this.selectedStudents);
            }else{
                lst = this.selectedStudents;
            }
            this.addGroupForm.students = lst;
            this.api.updateGroup(this.addGroupForm).then(this.loadTable);
        }

        addGroupSelectionChange(rows:Array<Student>):void{
            this.selectedStudents = rows;
        }

        studsToString(group: Group): string {
            let text = "";
            if (group.students) {
                if (group.students.length > 1) {
                    group.students.forEach(
                        (a: Student) => {
                            if (a.firstName && a.lastName) {
                                text = text.concat("«", a.firstName, " ", a.lastName, "», ");
                            }
                        });
                } else if (group.students.length) {
                    text = `«${group.students[0]}»`;
                } else {
                    text = "";
                }
            }
            return text;
        }

        loadTable(): void {
            this.api.getGroups((arr: Array<Group>, err: string) => {
                if (!err) {
                    let arr1: Array<Group> = [];
                    if (arr) arr1 = arr as Array<Group>;
                    this.tableChache = arr1;
                } else {
                    console.log(err);
                }
            })
        }

        sendCreate(): void {
            this.isAddModelDialogEnabled = false;
            if (!this.isEditing) {
                this.api.addNewGroup(this.addGroupForm).then(this.loadTable);
            } else {
                this.api.updateGroup(this.addGroupForm).then(this.loadTable);
            }
        }

        handleSelect(): void {
        }

        handleAdd(): void {
            this.formDialogTitle = "Добавить";
            this.isEditing = false;
            this.isAddModelDialogEnabled = true;
            this.addGroupForm = new Group();
        }

        handleEdit(index: Number, row: Group) {
            this.formDialogTitle = "Изменить";
            this.isEditing = true;
            this.isAddModelDialogEnabled = true;
            this.addGroupForm = row;
        }

        handleDelete(index: Number, row: Group | null) {
            if (row) {
                let id = row._id;
                if (id) {
                    this.api.deleteGroup(id).then(this.loadTable);
                }
            }
            else {
                console.log("wtf");
            }
        }

        async handleSelectionDelete(val: number): Promise<void> {
            let arr = this.selected.map((x: Group) => x);
            for (const s of arr) {
                let id = s._id;
                if (id) {
                    await this.api.deleteGroup(id);
                }
            }

            this.loadTable();
        }

        handleSelectionChange(rows: any) {
            this.selected = rows;
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

<style>
    #delete-group-id .el-dialog__body {
        padding: 8px;
    }
</style>
