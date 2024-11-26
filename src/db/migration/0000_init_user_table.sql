CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	`created_at` timestamp,
	`created_by` int,
	`updated_at` timestamp,
	`updated_by` int,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_unique_username` UNIQUE(`username`),
	CONSTRAINT `idx_unique_email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE INDEX `idx_created_at` ON `user` (`created_at`);