-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_createdById_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "householdId" TEXT,
ALTER COLUMN "createdById" DROP NOT NULL,
ALTER COLUMN "assignedToId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_householdId_fkey" FOREIGN KEY ("householdId") REFERENCES "households"("id") ON DELETE SET NULL ON UPDATE CASCADE;
