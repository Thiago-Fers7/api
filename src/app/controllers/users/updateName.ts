import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const { name } = ctx.request.body as { name: string };
	const { id } = ctx.params as { id: string };

	if (!name) {
		return ctx.throw(400, "Nome é obrigatório");
	}

	const userExists = await User.exists({ _id: id });

	if (!userExists) {
		return ctx.throw(404, "Usuário não encontrado");
	}

	const user = await User.findOneAndUpdate(
		{ _id: id },
		{ name },
		{ returnDocument: "after" }
	);

	ctx.status = 200;
	ctx.body = user;
};
