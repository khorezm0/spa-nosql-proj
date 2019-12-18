//import {Group, Student, StudentType, GroupType} from "../model/student";


export enum StudentType{
    Budget = "Бюджет",
    Commerce = "Коммерция"
}

export class Student {
    private _firstName: string;
    private _lastName: string;
    private _middleName: string;
    private _avgRate : Number;
    private _studType : StudentType;
    private _age : Number;
    private _academObligations : Array<string>;
    private _group : Group;

    constructor(firstName: string, lastName: string, middleName: string, avgRate: Number, studType: StudentType, age: Number, academObligations: Array<string>, group: Group) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._middleName = middleName;
        this._avgRate = avgRate;
        this._studType = studType;
        this._age = age;
        this._academObligations = academObligations;
        this._group = group;

        if(!firstName || !(/^[a-zA-Zа-яА-Я' ]+$/.test(firstName))) throw new Error(`Недопустимое имя '${firstName}'!`);
        if(!lastName || !(/^[a-zA-Zа-яА-Я' ]+$/.test(lastName))) throw new Error(`Недопустимое фамилие '${lastName}'!`);
        if(!middleName && !(/^[a-zA-Zа-яА-Я' ]+$/.test(middleName))) throw new Error(`Недопустимое отчество '${middleName}'!`);
        if(age < 1) throw new Error(`Недопустимый возвраст '${age}'!`);
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        if(!value || !(/^[a-zA-Zа-яА-Я' ]+$/.test( value))) throw new Error(`Недопустимое имя '${value}'!`);
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        if(!value || !(/^[a-zA-Zа-яА-Я' ]+$/.test( value))) throw new Error(`Недопустимое фамилие '${value}'!`);
        this._lastName = value;
    }

    get middleName(): string {
        return this._middleName;
    }

    set middleName(value: string) {
        if(!value && !(/^[a-zA-Zа-яА-Я' ]+$/.test(value))) throw new Error(`Недопустимое отчество '${value}'!`);
        this._middleName = value;
    }

    get avgRate(): Number {
        return this._avgRate;
    }

    set avgRate(value: Number) {
        this._avgRate = value;
    }

    get studType(): StudentType {
        return this._studType;
    }

    set studType(value: StudentType) {
        this._studType = value;
    }

    get age(): Number {
        return this._age;
    }

    set age(value: Number) {
        if(value < 1) throw new Error(`Недопустимый возвраст '${value}'!`);
        this._age = value;
    }

    get academObligations(): Array<string> {
        return this._academObligations;
    }

    set academObligations(value: Array<string>) {
        this._academObligations = value;
    }

    get group(): Group {
        return this._group;
    }

    set group(value: Group) {
        this._group = value;
    }

}
export enum GroupType{
    FullTime = "Очное",
    Distancelearning = "Заочное"
}

export class Group {
    private _name : string;
    private _groupName : GroupType;
    private _course : Number;
    private _students : Array<Student>;

    constructor(name: string, studType: GroupType, course: Number, students: Array<Student>) {
        this._name = name;
        this._groupName = studType;
        this._course = course;
        this._students = students;


        if(!name || !(/^[a-zA-Zа-яА-Я'\-0-9 ]+$/.test(name))) throw new Error(`Недопустимое имя '${name}'!`);
        if(course < 1 || course > 6) throw new Error(`Недопустимый курс '${course}'!`);
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if(!value || !(/^[a-zA-Zа-яА-Я'\-0-9 ]+$/.test(value))) throw new Error(`Недопустимое имя '${value}'!`);
        this._name = value;
    }

    get groupName(): GroupType {
        return this._groupName;
    }

    set groupName(value: GroupType) {
        this._groupName = value;
    }

    get course(): Number {
        return this._course;
    }

    set course(value: Number) {
        if(value < 1 || value > 6) throw new Error(`Недопустимый курс '${value}'!`);
        this._course = value;
    }

    get students(): Array<Student> {
        return this._students;
    }

    set students(value: Array<Student>) {
        this._students = value;
    }
}