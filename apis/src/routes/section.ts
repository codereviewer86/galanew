import { Router } from 'express';
import sectionController from '../controllers/section.controller';

const router = Router();

// Create Section
router.post('/', sectionController.createSection);

// Read all Sections
router.get('/', sectionController.getSections);

// Read one Section by id
router.get('/:id', sectionController.getSectionById);

// Read Section by section name
router.get('/name/:sectionName', sectionController.getSectionByName);

// Update Section
router.put('/:id', sectionController.updateSection);

// Delete Section
router.delete('/:id', sectionController.deleteSection);

export default router;
