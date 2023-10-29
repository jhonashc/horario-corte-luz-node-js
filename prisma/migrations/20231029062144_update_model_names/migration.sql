/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_schedule` DROP FOREIGN KEY `user_schedule_schedule_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_schedule` DROP FOREIGN KEY `user_schedule_user_id_fkey`;

-- DropTable
DROP TABLE `Schedule`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(40) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(65) NOT NULL,
    `is_dark_mode_on` BOOLEAN NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(255) NOT NULL,
    `sector` VARCHAR(255) NOT NULL,
    `schedule` VARCHAR(120) NOT NULL,
    `last_update` DATETIME(3) NULL,
    `link` TEXT NULL,

    INDEX `schedule_city_sector_idx`(`city`, `sector`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_schedule` ADD CONSTRAINT `user_schedule_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_schedule` ADD CONSTRAINT `user_schedule_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
