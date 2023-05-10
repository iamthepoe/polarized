-- CreateTable
CREATE TABLE "authors" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phrases" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "phrases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oppositions" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "firstAuthorId" TEXT NOT NULL,
    "secondAuthorId" TEXT NOT NULL,

    CONSTRAINT "oppositions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phrases" ADD CONSTRAINT "phrases_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oppositions" ADD CONSTRAINT "oppositions_firstAuthorId_fkey" FOREIGN KEY ("firstAuthorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oppositions" ADD CONSTRAINT "oppositions_secondAuthorId_fkey" FOREIGN KEY ("secondAuthorId") REFERENCES "authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
