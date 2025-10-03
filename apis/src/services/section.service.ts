import { PrismaClient } from '@prisma/client';
import { HttpException } from '../exceptions/HttpException';

const prisma = new PrismaClient();

export interface CreateSectionData {
  section: string;
  data?: any;
}

export interface UpdateSectionData {
  section?: string;
  data?: any;
}

const findAllSections = async () => {
  try {
    const sections = await prisma.section.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return sections;
  } catch (error) {
    throw new HttpException(500, 'Failed to fetch sections');
  }
};

const findSectionById = async (sectionId: number) => {
  try {
    const section = await prisma.section.findUnique({
      where: { id: sectionId }
    });
    
    if (!section) {
      throw new HttpException(404, 'Section not found');
    }
    
    return section;
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, 'Failed to fetch section');
  }
};

const findSectionByName = async (sectionName: string) => {
  try {
    const section = await prisma.section.findFirst({
      where: { section: sectionName }
    });
    
    if (!section) {
      throw new HttpException(404, 'Section not found');
    }
    
    return section;
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, 'Failed to fetch section');
  }
};

const createSection = async (sectionData: CreateSectionData) => {
  try {
    if (!sectionData.section) {
      throw new HttpException(400, 'Section name is required');
    }

    // Check if section with same name already exists
    const existingSection = await prisma.section.findFirst({
      where: { section: sectionData.section }
    });

    if (existingSection) {
      throw new HttpException(409, `Section with name '${sectionData.section}' already exists`);
    }

    const newSection = await prisma.section.create({
      data: {
        section: sectionData.section,
        data: sectionData.data || {}
      }
    });

    return newSection;
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, 'Failed to create section');
  }
};

const updateSection = async (sectionId: number, sectionData: UpdateSectionData) => {
  try {
    // Check if section exists
    await findSectionById(sectionId);

    // If updating section name, check for duplicates
    if (sectionData.section) {
      const existingSection = await prisma.section.findFirst({
        where: { 
          section: sectionData.section,
          NOT: { id: sectionId }
        }
      });

      if (existingSection) {
        throw new HttpException(409, `Section with name '${sectionData.section}' already exists`);
      }
    }

    const updatedSection = await prisma.section.update({
      where: { id: sectionId },
      data: sectionData
    });

    return updatedSection;
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, 'Failed to update section');
  }
};

const deleteSection = async (sectionId: number) => {
  try {
    // Check if section exists
    await findSectionById(sectionId);

    await prisma.section.delete({
      where: { id: sectionId }
    });

    return { message: 'Section deleted successfully' };
  } catch (error) {
    if (error instanceof HttpException) throw error;
    throw new HttpException(500, 'Failed to delete section');
  }
};

export default {
  findAllSections,
  findSectionById,
  findSectionByName,
  createSection,
  updateSection,
  deleteSection
};
