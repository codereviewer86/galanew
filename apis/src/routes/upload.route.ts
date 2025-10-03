import { Router } from 'express';
import uploadController from '../controllers/upload.controller';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.post('/image', upload.single('image'), uploadController.uploadImage);

router.delete('/image/:filename', uploadController.deleteImage);

export default router;
