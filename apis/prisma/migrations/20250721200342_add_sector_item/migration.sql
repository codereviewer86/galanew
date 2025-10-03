-- CreateTable
CREATE TABLE "SectorItem" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "SectorItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SectorItem_key_key" ON "SectorItem"("key");
