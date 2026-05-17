import "dotenv/config";
import app from "./app";
import * as env from "./config/env";
import { Logger } from "./utils/logger";

const server = app.listen(env.PORT, () => {
	Logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			Logger.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error) => {
	Logger.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	Logger.info("SIGTERM received");
	if (server) {
		server.close();
	}
});
