-- CreateTable
CREATE TABLE `Bookshelf` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Judul` VARCHAR(191) NOT NULL,
    `Penulis` VARCHAR(191) NOT NULL,
    `TanggalTerbit` DATETIME(3) NOT NULL,
    `IsCompleted` BOOLEAN NOT NULL DEFAULT false,
    `HalamanTerakhir` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Bookshelf_Judul_key`(`Judul`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
