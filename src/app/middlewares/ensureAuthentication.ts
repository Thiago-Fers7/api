import jwt, { JwtPayload } from "jsonwebtoken";
import { Context, Next } from "koa";

import User from "../models/users";

type IDecoded = (JwtPayload | string) & { id: string };

export default async (ctx: Context, next: Next) => {
	const authCode = ctx.request.get("Authorization");

	if (!authCode) {
		return ctx.throw(401, "Token não informado");
	}

	const [, token] = authCode.split(" ");

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as IDecoded;

		const user = await User.findById(decoded.id);

		ctx.state.user = user;

		return next();
	} catch {
		return ctx.throw(401, "Token inválido");
	}
};
