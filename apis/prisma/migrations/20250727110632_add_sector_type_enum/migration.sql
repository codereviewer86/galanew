-- CreateEnum
CREATE TYPE "SectorType" AS ENUM ('ENERGY', 'INFRA');

-- AlterTable
ALTER TABLE "SectorItem" ADD COLUMN     "type" "SectorType" NOT NULL DEFAULT 'ENERGY';
