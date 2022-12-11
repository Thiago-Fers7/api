import { Context, Next } from "koa";

export default (ctx: Context, next: Next) => {
	return next().catch((err) => {
		const { statusCode, message, ...options } = err;

		ctx.status = statusCode || 500;
		ctx.body = {
			status: "error",
			message,
			...options,
		};

		ctx.app.emit("error", err, ctx);
	});
};
