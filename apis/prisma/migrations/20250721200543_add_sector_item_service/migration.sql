-- CreateTable
CREATE TABLE "SectorItemService" (
    "id" SERIAL NOT NULL,
    "to" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sectorItemId" INTEGER NOT NULL,

    CONSTRAINT "SectorItemService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SectorItemService" ADD CONSTRAINT "SectorItemService_sectorItemId_fkey" FOREIGN KEY ("sectorItemId") REFERENCES "SectorItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
