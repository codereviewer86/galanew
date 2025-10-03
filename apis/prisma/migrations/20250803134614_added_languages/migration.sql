-- AlterTable
ALTER TABLE "SectorItemService" ADD COLUMN     "descriptionRu" TEXT,
ADD COLUMN     "labelRu" TEXT;

-- AlterTable
ALTER TABLE "SectorItemServiceDetails" ADD COLUMN     "descriptionRu" TEXT[],
ADD COLUMN     "titleRu" TEXT;
