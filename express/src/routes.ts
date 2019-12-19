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
            let items: any = await Repo.StudentModel.find({});
            response.json(items);
        }
    },
    {
        path: "/students/:id",
        method: "get",
        action: async (request: Request, response: Response) => {
            try {
                let item: any = await Repo.StudentModel.findOne(request.params.id);
                response.json(item);
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
                let item: any = await Repo.StudentModel.create(request.body);
                await Repo.StudentModel.save((err) => {
                    if(err) console.log(err);
                });
                response.json(item);
            } catch (ex) {
                console.log(ex);
                response.status(300);
                response.end();
            }
        }
    }
];