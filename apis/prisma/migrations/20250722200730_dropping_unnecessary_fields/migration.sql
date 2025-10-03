/*
  Warnings:

  - You are about to drop the column `key` on the `SectorItem` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `SectorItem` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `SectorItemService` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SectorItem" DROP COLUMN "key",
DROP COLUMN "link";

-- AlterTable
ALTER TABLE "SectorItemService" DROP COLUMN "to";
