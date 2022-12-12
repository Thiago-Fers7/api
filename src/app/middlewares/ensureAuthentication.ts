import { Context, Next } from "koa";

export default async (ctx: Context, next: Next) => {
	const authCode = ctx.request.get("Authorization");
	console.log("🚀 ~ file: ensureAuthentication.ts:5 ~ authCode", authCode);

	next();
};
