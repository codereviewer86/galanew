import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = Router();

// Create SectorItemService
router.post('/', async (req, res) => {
  try {
    const { img, brandLogo, label, labelRu, description, descriptionRu, sectorItemId } = req.body;
    if (!sectorItemId) {
      return res.status(400).json({ error: 'sectorItemId is required' });
    }
    const service = await prisma.sectorItemService.create({
      data: { img, brandLogo, label, labelRu, description, descriptionRu, sectorItemId },
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all SectorItemServices
router.get('/', async (req, res) => {
  try {
    if (!req.query.sectorItemId) {
      return res.status(400).json({ error: 'sectorItemId is required' });
    }
    const sectorItemId = Number(req.query.sectorItemId);
    if (isNaN(sectorItemId)) {
      return res.status(400).json({ error: 'sectorItemId must be a number' });
    }
    const services = await prisma.sectorItemService.findMany({ where: { sectorItemId }});
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one SectorItemService by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await prisma.sectorItemService.findUnique({ where: { id: Number(id) } });
    if (!service) return res.status(404).json({ error: 'Not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update SectorItemService
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { img, brandLogo, label, labelRu, description, descriptionRu, sectorItemId } = req.body;
    const service = await prisma.sectorItemService.update({
      where: { id: Number(id) },
      data: { img, brandLogo, label, labelRu, description, descriptionRu, sectorItemId },
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete SectorItemService
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sectorItemService.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
