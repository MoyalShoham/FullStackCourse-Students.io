import Post, { IPost } from '../models/post-model';
import baseController from './base-controller';

const postController = new baseController<IPost>(Post);

export default postController;