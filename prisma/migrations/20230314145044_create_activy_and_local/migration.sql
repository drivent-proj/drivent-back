-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activy" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startHour" TIMESTAMP(3) NOT NULL,
    "endHour" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Activy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscribeActivy" (
    "id" SERIAL NOT NULL,
    "activyId" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscribeActivy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activy" ADD CONSTRAINT "Activy_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribeActivy" ADD CONSTRAINT "SubscribeActivy_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribeActivy" ADD CONSTRAINT "SubscribeActivy_activyId_fkey" FOREIGN KEY ("activyId") REFERENCES "Activy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
