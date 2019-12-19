import { Request, Response } from "express";
import { Group, Student, StudentType, GroupType } from "./model/student";
import { Repo } from "./db/repo";

/**
 * All application routes.
 */
export const AppRoutes = [
    {
        path: "/students",
        method: "get",
        action: async (request: Request, response: Response) => {
            let items: any = await Repo.StudentModel.find({}).populate("groups");
            response.json(items);
        }
    },
    {
        path: "/students/:id",
        method: "get",
        action: async (request: Request, response: Response) => {
            try {
                let item: any = await Repo.StudentModel.findOne({"_id":request.params.id}).populate("groups");
                response.json(item);
            } catch (ex) {
                console.log(ex);
                response.status(404);
                response.end();
            }
        }
    },
    {
        path: "/students/:id",
        method: "delete",
        action: async (request: Request, response: Response) => {
            try {
                let iserr = true;
                let item: any = await Repo.StudentModel.findOne({"_id":request.params.id}).deleteOne(function (err, res) {
                    if(err) {
                        console.log("ERRR: "+err);
                    }else{
                        iserr = false;
                    }
                });
                if(iserr){
                    response.status(404);
                    response.end();
                }else {
                    response.status(200);
                    response.end();
                }
            } catch (ex) {
                console.log(ex);
                response.status(404);
                response.end();
            }
        }
    },
    {
        path: "/students",
        method: "post",
        action: async (request: Request, response: Response) => {
            try {
                //console.log(request.body);
                let item: any = await new Repo.StudentModel(request.body).save(function (err, res) {
                    if(err) console.log("ERRR: "+err);
                });
                response.json(item);
            } catch (ex) {
                console.log(ex);
                response.status(300);
                response.end();
            }
        }
    },
    {
        path: "/students",
        method: "put",
        action: async (request: Request, response: Response) => {
            try {
                //console.log(request.body);
                let data = request.body;
                let id = request.body._id;
                delete data._id;
                let iserr = true;

                let item: any = await Repo.StudentModel.updateOne({"_id":id},data,function (err, res) {
                    if(err) {
                        console.log("ERRR: "+err);
                    }else{
                        iserr = false;
                    }
                });
                if(iserr){
                    response.status(404);
                    response.end();
                }else {
                    response.json(item);
                    response.end();
                }
            } catch (ex) {
                console.log(ex);
                response.status(300);
                response.end();
            }
        }
    },
    {
        path: "/groups",
        method: "get",
        action: async (request: Request, response: Response) => {
            let items: any = await Repo.GroupModel.find({}).populate("students");
            response.json(items);
        }
    },
    {
        path: "/groups/:id",
        method: "get",
        action: async (request: Request, response: Response) => {
            try {
                let item: any = await Repo.GroupModel.findOne({"_id":request.params.id}).populate("students");
                response.json(item);
            } catch (ex) {
                console.log(ex);
                response.status(404);
                response.end();
            }
        }
    },
    {
        path: "/groups/:id",
        method: "delete",
        action: async (request: Request, response: Response) => {
            try {
                let iserr = true;
                let item: any = await Repo.GroupModel.findOne({"_id":request.params.id}).deleteOne(function (err, res) {
                    if(err) {
                        console.log("ERRR: "+err);
                    }else{
                        iserr = false;
                    }
                });
                if(iserr){
                    response.status(404);
                    response.end();
                }else {
                    response.status(200);
                    response.end();
                }
            } catch (ex) {
                console.log(ex);
                response.status(404);
                response.end();
            }
        }
    },
    {
        path: "/groups",
        method: "post",
        action: async (request: Request, response: Response) => {
            try {
                //console.log(request.body);
                let item: any = await new Repo.GroupModel(request.body).save(function (err, res) {
                    if(err) console.log("ERRR: "+err);
                });
                response.json(item);
            } catch (ex) {
                console.log(ex);
                response.status(300);
                response.end();
            }
        }
    },
    {
        path: "/groups",
        method: "put",
        action: async (request: Request, response: Response) => {
            try {
                //console.log(request.body);
                let data = request.body;
                let id = request.body._id;
                delete data._id;
                let iserr = true;

                let item: any = await Repo.GroupModel.updateOne({"_id":id},data,function (err, res) {
                    if(err) {
                        console.log("ERRR: "+err);
                    }else{
                        iserr = false;
                    }
                });
                if(iserr){
                    response.status(404);
                    response.end();
                }else {
                    response.json(item);
                    response.end();
                }
            } catch (ex) {
                console.log(ex);
                response.status(300);
                response.end();
            }
        }
    }
];