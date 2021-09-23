/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(12)`.

*/
-- AlterTable
ALTER TABLE `Task` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(12) NOT NULL,
    ADD PRIMARY KEY (`id`);
