import BaseController from "./base-controller";
import Post, { IPost } from "../models/post-model";
import { Request, Response } from "express";

class PostController extends BaseController<IPost> {
    constructor() {
        super(Post);
    }

    async post(req: Request, res: Response) {
        req.body.owner = req.body.user._id;
        super.post(req, res);
    }
}

export default new PostController();