import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const { id } = ctx.params as { id: string };

	const user = await User.findById(id).populate("contacts", "-contacts");

	if (!user) {
		return ctx.throw(404, "Usuário não encontrado");
	}

	ctx.status = 200;
	ctx.body = user;
};
