import { Context } from "koa";

import User from "../../models/users";

interface IUser {
	name: string;
	customId: string;
	password: string;
}

export default async (ctx: Context) => {
	const { name, customId, password } = ctx.request.body as IUser;

	if (!name || !customId || !password) {
		return ctx.throw(400, "Nome, Id e senha são obrigatórios");
	}

	const customIdExists = await User.exists({ customId });

	if (customIdExists) {
		return ctx.throw(400, "Id já existe");
	}

	const userCreated = await User.create({ name, customId, password });

	ctx.status = 201;
	ctx.body = userCreated;
};
