import express from "express";
const router = express.Router();
import postController from "../controllers/post-controller";


router.get("/", postController.get.bind(postController));

router.get("/:owner", postController.getById.bind(postController));

router.post("/", postController.post.bind(postController));

router.put("/:id", postController.put.bind(postController));

router.delete("/:id", postController.remove.bind(postController));

export default router; 