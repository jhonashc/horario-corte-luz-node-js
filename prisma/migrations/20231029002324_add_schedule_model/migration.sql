-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(255) NOT NULL,
    `sector` VARCHAR(255) NOT NULL,
    `schedule` VARCHAR(15) NOT NULL,
    `last_update` DATETIME(3) NULL,
    `link` TEXT NULL,

    INDEX `Schedule_city_sector_idx`(`city`, `sector`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
