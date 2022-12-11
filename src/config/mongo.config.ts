import { connect } from "mongoose";

const url = `mongodb://root:root@localhost:27017/chat?authSource=admin`;

(async () => {
	try {
		await connect(url);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error);
	}
})();
