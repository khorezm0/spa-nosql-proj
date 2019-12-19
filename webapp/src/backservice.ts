import axios, {AxiosResponse} from 'axios'
import {Student, Group} from './model/student'

export class ApiService {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    getStudents(callback: Function): Promise<void> {
        return axios.get(this.url + '/students').then(
            result => {
                console.log(result.data)
                //this.todos = result.data
                let obj: Array<Student> = result.data.map((obj: any) => {
                    return Object.assign(new Student(), obj)
                });
                callback(obj, null);
            },
            error => {
                console.error(error)
                callback(null, error.toString());
            }
        )
    }

    addNewStudent(s: Student): Promise<void> {
        return axios.post(this.url + '/students', s)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    updateStudent(s: Student): Promise<void> {
        return axios.put(this.url + `/students`, s
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteStudent(id: String): Promise<void> {
        return axios.delete(this.url + `/students/${id}`
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
    }

    getGroups(callback: Function): Promise<void> {
        return axios.get(this.url + '/groups').then(
            result => {
                console.log(result.data)
                //this.todos = result.data
                let obj: Array<Group> = result.data.map((obj: any) => {
                    return Object.assign(new Group(), obj)
                });
                callback(obj, null);
            },
            error => {
                console.error(error)
                callback(null, error.toString());
            }
        )
    }

    addNewGroup(s: Group): Promise<void> {
        return axios.post(this.url + '/groups', s)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }

    updateGroup(s: Group): Promise<void> {
        return axios.put(this.url + `/groups`, s
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    deleteGroup(id: String): Promise<void> {
        return axios.delete(this.url + `/groups/${id}`
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });
    }
}
