-- CreateTable
CREATE TABLE "SectorItemServiceDetails" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "imageSrc" TEXT NOT NULL,
    "sectorItemServiceId" INTEGER NOT NULL,

    CONSTRAINT "SectorItemServiceDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SectorItemServiceDetails" ADD CONSTRAINT "SectorItemServiceDetails_sectorItemServiceId_fkey" FOREIGN KEY ("sectorItemServiceId") REFERENCES "SectorItemService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
