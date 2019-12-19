import axios from 'axios'
import { Student, Group } from './model/student'

export class ApiService{
    
    private url :string;

    constructor(url:string){
        this.url = url;
    }

    getStudents(callback : Function) {
        axios.get(this.url+'/students').then(
        result => {
            console.log(result.data)
            //this.todos = result.data
            let obj: Array<Student> = result.data;
            callback(obj, null);
        },
        error => {
            console.error(error)
            callback(null,error);
        }
    )
  }
  
  addNewStudent(s : Student) {
      console.log(JSON.stringify(s));
      axios.post(this.url+'/students',s)
    .then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  updateStudent(s : Student) {
    axios.put(this.url+`/students`,
    s
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  deleteStudent(id : String) {
    axios.delete(this.url+`/students/${id}`
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
}
