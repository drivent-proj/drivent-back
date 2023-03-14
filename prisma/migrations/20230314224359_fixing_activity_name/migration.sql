/*
  Warnings:

  - You are about to drop the `Activy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubscribeActivy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activy" DROP CONSTRAINT "Activy_localId_fkey";

-- DropForeignKey
ALTER TABLE "SubscribeActivy" DROP CONSTRAINT "SubscribeActivy_activyId_fkey";

-- DropForeignKey
ALTER TABLE "SubscribeActivy" DROP CONSTRAINT "SubscribeActivy_enrollmentId_fkey";

-- DropTable
DROP TABLE "Activy";

-- DropTable
DROP TABLE "SubscribeActivy";

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startHour" TIMESTAMP(3) NOT NULL,
    "endHour" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribeActivity" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscribeActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribeActivity" ADD CONSTRAINT "SubscribeActivity_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribeActivity" ADD CONSTRAINT "SubscribeActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
