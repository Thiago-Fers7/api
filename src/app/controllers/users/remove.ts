import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const { id } = ctx.params as { id: string };

	const userExists = await User.exists({ _id: id });

	if (!userExists) {
		return ctx.throw(404, "Usuário não encontrado");
	}

	await User.deleteOne({ _id: id });

	ctx.status = 204;
};
