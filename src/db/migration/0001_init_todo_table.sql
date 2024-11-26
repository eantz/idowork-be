CREATE TABLE `todo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`message` varchar(500),
	`status` varchar(50),
	`scheduled_at` timestamp,
	`done_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`created_by` int,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`updated_by` int,
	CONSTRAINT `todo_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE INDEX `idx_user_message` ON `todo` (`user_id`,`message`);--> statement-breakpoint
CREATE INDEX `idx_user_status` ON `todo` (`user_id`,`status`);--> statement-breakpoint
CREATE INDEX `idx_user_schedule` ON `todo` (`user_id`,`scheduled_at`);--> statement-breakpoint
CREATE INDEX `idx_created_at` ON `todo` (`created_at`);