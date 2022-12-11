import { Context } from "koa";

import User from "../../models/users";

interface IUser {
	name: string;
	customId: string;
}

export default async (ctx: Context) => {
	const { name, customId } = ctx.request.body as IUser;

	if (!name || !customId) {
		return ctx.throw(400, "Nome e Id são obrigatórios");
	}

	const customIdExists = await User.exists({ customId });

	if (customIdExists) {
		return ctx.throw(400, "Id já existe");
	}

	const userCreated = await User.create({ name, customId });

	ctx.status = 201;
	ctx.body = userCreated;
};
