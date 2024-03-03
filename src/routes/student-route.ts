import express from 'express';
const router = express.Router();
import studentController from '../controllers/student-controller';
import authMiddleware from '../common/auth-middleware';


router.get('/', authMiddleware, studentController.get.bind(studentController));
router.get('/:id', authMiddleware, studentController.getById.bind(studentController));
router.post('/', authMiddleware, studentController.post.bind(studentController));
router.put('/:id', authMiddleware, studentController.put.bind(studentController));
router.delete('/:id', authMiddleware, studentController.remove.bind(studentController));
router.get('/:id/posts', authMiddleware, studentController.getPostsByStudent);

export default router;


