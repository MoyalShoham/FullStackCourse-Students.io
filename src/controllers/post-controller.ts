import Post, { IPost } from '../models/post-model';
import baseController from './base-controller';

// const postController = new baseController<IPost>(Post);

class PostController extends baseController<IPost> {
    constructor() {
        super(Post);
    }
}


export default new PostController();