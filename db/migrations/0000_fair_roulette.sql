CREATE TABLE `users` (
	`email` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`namespace` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `users_namespace_email_idx` ON `users` (`namespace`,`email`);