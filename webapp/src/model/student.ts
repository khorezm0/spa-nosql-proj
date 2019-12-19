//import {Group, Student, StudentType, GroupType} from "../model/student";


export enum StudentType{
    Budget = "Бюджет",
    Commerce = "Коммерция"
}

export class Student {
    private FirstName: string | null;
    private LastName: string | null;
    private MiddleName: string | null;
    private AvgRate : Number | null;
    private StudType : StudentType | null;
    private Age : Number | null;
    private AcademObligations : Array<string> | null;
    private Group : Group | null;
    
    _id : string | null | undefined =undefined;

    constructor(firstName: string | null = null, lastName: string | null = null, middleName: string | null = null, avgRate: Number  | null = null, studType: StudentType | null = null, age: Number | null = null, academObligations: Array<string> | null = null, group: Group | null = null) {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.MiddleName = middleName;
        this.AvgRate = avgRate;
        this.StudType = studType;
        this.Age = age;
        this.AcademObligations = academObligations;
        this.Group = group;

        if(firstName && !(/^[a-zA-Zа-яА-Я' ]+$/.test(firstName))) throw new Error(`Недопустимое имя '${firstName}'!`);
        if(lastName && !(/^[a-zA-Zа-яА-Я' ]+$/.test(lastName))) throw new Error(`Недопустимое фамилие '${lastName}'!`);
        if(middleName && !(/^[a-zA-Zа-яА-Я' ]+$/.test(middleName))) throw new Error(`Недопустимое отчество '${middleName}'!`);
        if(age && age < 1) throw new Error(`Недопустимый возвраст '${age}'!`);
    }

    get firstName(): string | null {
        return this.FirstName;
    }

    set firstName(value: string | null) {
        if(value && !(/^[a-zA-Zа-яА-Я' ]+$/.test( value))) throw new Error(`Недопустимое имя '${value}'!`);
        this.FirstName = value;
    }

    get lastName(): string | null {
        return this.LastName;
    }

    set lastName(value: string | null) {
        if(value && !(/^[a-zA-Zа-яА-Я' ]+$/.test( value))) throw new Error(`Недопустимое фамилие '${value}'!`);
        this.LastName = value;
    }

    get middleName(): string | null {
        return this.MiddleName;
    }

    set middleName(value: string | null) {
        if(value && !(/^[a-zA-Zа-яА-Я' ]+$/.test(value))) throw new Error(`Недопустимое отчество '${value}'!`);
        this.MiddleName = value;
    }

    get avgRate(): Number | null {
        return this.AvgRate;
    }

    set avgRate(value: Number | null) {
        this.AvgRate = value;
    }

    get studType(): StudentType | null {
        return this.StudType;
    }

    set studType(value: StudentType | null) {
        this.StudType = value;
    }

    get age(): Number | null {
        return this.Age;
    }

    set age(value: Number | null) {
        if(value && value < 1) throw new Error(`Недопустимый возвраст '${value}'!`);
        this.Age = value;
    }

    get academObligations(): Array<string> | null {
        return this.AcademObligations;
    }

    set academObligations(value: Array<string> | null) {
        this.AcademObligations = value;
    }

    get group(): Group | null {
        return this.Group;
    }

    set group(value: Group | null) {
        this.Group = value;
    }

}
export enum GroupType{
    FullTime = "Очное",
    Distancelearning = "Заочное"
}

export class Group {
    private Name : string | null;
    private Course : Number | null;
    private Students : Array<Student> | null;
    private GroupType : GroupType | null;

    _id : string| null | undefined = undefined;

    constructor(name: string | null = null, groupType: GroupType | null = null, course: Number | null = null, students: Array<Student> | null = null) {
        this.Name = name;
        this.Course = course;
        this.Students = students;
        this.GroupType = groupType;


        if(name && !(/^[a-zA-Zа-яА-Я'\-0-9 ]+$/.test(name))) throw new Error(`Недопустимое имя '${name}'!`);
        if(course && (course < 1 || course > 6)) throw new Error(`Недопустимый курс '${course}'!`);
    }

    get groupType() : GroupType | null{
        return this.GroupType;
    }
    set groupType(value: GroupType | null){
        this.GroupType = value;
    }

    get name(): string | null {
        return this.Name;
    }

    set name(value: string | null) {
        if(value && !(/^[a-zA-Zа-яА-Я'\-0-9 ]+$/.test(value))) throw new Error(`Недопустимое имя '${value}'!`);
        this.Name = value;
    }

    get course(): Number | null {
        return this.Course;
    }

    set course(value: Number | null) {
        if(value && (value < 1 || value > 6)) throw new Error(`Недопустимый курс '${value}'!`);
        this.Course = value;
    }

    get students(): Array<Student> | null {
        return this.Students;
    }

    set students(value: Array<Student> | null) {
        this.Students = value;
    }
}