-- DropIndex
DROP INDEX "SectorItem_key_key";

-- AlterTable
ALTER TABLE "SectorItem" ALTER COLUMN "key" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SectorItemService" ALTER COLUMN "to" DROP NOT NULL;
