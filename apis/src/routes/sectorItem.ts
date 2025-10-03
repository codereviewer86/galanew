import { Router } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = Router();

// Create SectorItem
router.post('/', async (req, res) => {
  try {
    const { img, label, labelRu, description, descriptionRu, type } = req.body;
    const sectorItem = await prisma.sectorItem.create({
      data: { 
        img, 
        label, 
        labelRu,
        description,
        descriptionRu,
        type: (type as any) || 'ENERGY'
      },
    });
    res.status(201).json(sectorItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all SectorItems
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const where: any = type ? { type: String(type) } : {};
    
    const sectorItems = await prisma.sectorItem.findMany({
      where,
      include: { services: true }
    });
    res.json(sectorItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read one SectorItem by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sectorItem = await prisma.sectorItem.findUnique({ where: { id: Number(id) } });
    if (!sectorItem) return res.status(404).json({ error: 'Not found' });
    res.json(sectorItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update SectorItem
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { img, label, labelRu, description, descriptionRu, type } = req.body;
    const sectorItem = await prisma.sectorItem.update({
      where: { id: Number(id) },
      data: { img, label, labelRu, description, descriptionRu, type },
    });
    res.json(sectorItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete SectorItem
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.sectorItem.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
