import { Context, Next } from "koa";

export default async (ctx: Context, next: Next) => {
	const { id } = ctx.params as { id: string };

	if (!id.match(/^[0-9a-fA-F]{24}$/)) {
		ctx.throw(400, "Invalid ID");
	}

	return next();
};
