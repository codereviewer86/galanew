import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();

// Create SectorItemServiceDetails
router.post('/', async (req, res) => {
  try {
    const { title, titleRu, description, descriptionRu, imageSrc, pdfUrl, sectorItemServiceId } = req.body;
    if (!sectorItemServiceId) {
      return res.status(400).json({ error: 'sectorItemServiceId is required' });
    }
    const details = await prisma.sectorItemServiceDetails.create({
      data: { title, titleRu, description, descriptionRu, imageSrc, pdfUrl, sectorItemServiceId },
    });
    res.status(201).json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all SectorItemServiceDetails (optionally filter by sectorItemServiceId)
router.get('/', async (req, res) => {
  try {
    const sectorItemServiceId = req.query.sectorItemServiceId ? Number(req.query.sectorItemServiceId) : undefined;
    if (!sectorItemServiceId || isNaN(sectorItemServiceId)) {
      return res.status(400).json({ error: 'sectorItemServiceId is required and must be a number' });
    }
    const where = sectorItemServiceId ? { sectorItemServiceId } : {};
    const details = await prisma.sectorItemServiceDetails.findMany({ where });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one SectorItemServiceDetails by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const details = await prisma.sectorItemServiceDetails.findUnique({ where: { id: Number(id) } });
    if (!details) return res.status(404).json({ error: 'Not found' });
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update SectorItemServiceDetails
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, titleRu, description, descriptionRu, imageSrc, pdfUrl, sectorItemServiceId } = req.body;
    const details = await prisma.sectorItemServiceDetails.update({
      where: { id: Number(id) },
      data: { title, titleRu, description, descriptionRu, imageSrc, pdfUrl, sectorItemServiceId },
    });
    res.json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete SectorItemServiceDetails
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sectorItemServiceDetails.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
