import { NextFunction, Request, Response } from 'express';
import sectionService, { CreateSectionData, UpdateSectionData } from '../services/section.service';
import { createSectionSchema, updateSectionSchema } from '../validation/section.validation';

const getSections = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sections = await sectionService.findAllSections();
    res.status(200).json({ data: sections, message: 'Sections retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

const getSectionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sectionId = Number(req.params.id);
    const section = await sectionService.findSectionById(sectionId);
    res.status(200).json({ data: section, message: 'Section retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

const getSectionByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sectionName = req.params.sectionName;
    const section = await sectionService.findSectionByName(sectionName);
    res.status(200).json({ data: section, message: 'Section retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

const createSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await createSectionSchema.validate(req.body);
    const sectionData: CreateSectionData = req.body;
    const newSection = await sectionService.createSection(sectionData);
    res.status(201).json({ data: newSection, message: 'Section created successfully' });
  } catch (error) {
    next(error);
  }
};

const updateSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updateSectionSchema.validate(req.body);
    const sectionId = Number(req.params.id);
    const sectionData: UpdateSectionData = req.body;
    const updatedSection = await sectionService.updateSection(sectionId, sectionData);
    res.status(200).json({ data: updatedSection, message: 'Section updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sectionId = Number(req.params.id);
    const result = await sectionService.deleteSection(sectionId);
    res.status(200).json({ data: result, message: 'Section deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export default {
  getSections,
  getSectionById,
  getSectionByName,
  createSection,
  updateSection,
  deleteSection
};
