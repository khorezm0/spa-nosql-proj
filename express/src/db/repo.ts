import * as mongoose from "mongoose";

const StudentScheme = new mongoose.Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    avgRate : Number,
    studType : String,
    age : Number,
    academObligations : Array,
    group : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'groups'
    }
});
const GroupScheme = new mongoose.Schema({
    name: String,
    course: Number,
    groupType : String,
    students : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }]
});
 

export class Repo {

    private _connectionString : string;
    
    public static StudentModel = mongoose.model('students', StudentScheme);
    public static GroupModel = mongoose.model('groups', GroupScheme);

    constructor(connectionString : string = "mongodb://localhost:27017"){
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