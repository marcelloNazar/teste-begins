-- CreateTable
CREATE TABLE "stores" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stores_url_key" ON "stores"("url");

-- CreateIndex
CREATE UNIQUE INDEX "stores_address_key" ON "stores"("address");
