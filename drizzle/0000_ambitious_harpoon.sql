CREATE TABLE `client_account` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `client_account_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `client_post` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`author` varchar(256),
	`description` text,
	`url` varchar(256),
	`url_to_image` varchar(256),
	`content` text,
	`published_at` timestamp,
	`created_by` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `client_post_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `client_session` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `client_session_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `client_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `client_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `client_verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `client_verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `client_account` ADD CONSTRAINT `client_account_user_id_client_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `client_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `client_post` ADD CONSTRAINT `client_post_created_by_client_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `client_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `client_session` ADD CONSTRAINT `client_session_user_id_client_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `client_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `client_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `client_post` (`created_by`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `client_post` (`name`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `client_session` (`user_id`);