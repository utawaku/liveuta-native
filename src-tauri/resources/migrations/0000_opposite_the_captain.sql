CREATE TABLE `channel` (
	`channelId` text(24) PRIMARY KEY NOT NULL,
	`nameKor` text NOT NULL,
	`names` text NOT NULL,
	`channelAddr` text NOT NULL,
	`handleName` text NOT NULL,
	`waiting` integer NOT NULL,
	`alive` integer NOT NULL,
	`createdAt` text
);
