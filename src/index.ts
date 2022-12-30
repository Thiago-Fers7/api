import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";

import errorHandler from "./app/middlewares/errorHandler";
import router from "./app/routes";

import "./config/mongo.config";

const app = new Koa();

app.use(errorHandler);
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

const PORT = 3333;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
