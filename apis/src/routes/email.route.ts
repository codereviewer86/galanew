import { Router } from 'express';
import emailController from '../controllers/email.controller';
import multer from 'multer';

const router = Router();

// Configure multer for file uploads (resume)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed for resume upload'));
    }
  }
});

// Route for contact form submission
router.post('/contact', upload.single('resume'), emailController.sendContactForm);

export default router;
