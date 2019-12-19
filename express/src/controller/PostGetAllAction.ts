import {Request, Response} from "express";
import {Group, Student, StudentType, GroupType} from "../model/student";
import {Repo} from "../db/repo";


export async function postGetAllAction(request: Request, response: Response) {
    
    let items : any = await Repo.StudentModel.find({});
    response.json(items);
}