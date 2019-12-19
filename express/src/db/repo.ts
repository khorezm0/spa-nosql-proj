import * as mongoose from "mongoose";

const StudentScheme = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    MiddleName: String,
    AvgRate : Number,
    StudType : String,
    Age : Number,
    AcademObligations : [{type: String}],
    Group : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }
});
const GroupScheme = new mongoose.Schema({
    Name: String,
    Course: Number,
    GroupType : String,
    Students : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }]
});
 

export class Repo {

    private _connectionString : string;
    
    public static StudentModel = mongoose.model('students', StudentScheme);
    public static GroupModel = mongoose.model('groups', GroupScheme);

    constructor(connectionString : string = "mongodb://localhost:27017/study"){
        this._connectionString = connectionString;
    }

    connect() : void {
        mongoose.connect(this._connectionString, { useNewUrlParser: true });
        mongoose.connection.once('open', () => {
            console.info('Connected to Mongo via Mongoose');
        });
        mongoose.connection.on('error', (err) => {
            console.error('Unable to connect to Mongo via Mongoose', err);
        });
    }
}