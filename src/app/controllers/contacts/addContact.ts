import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const { id: newContactdId } = ctx.params as { id: string };

	const contactdExists = await User.exists({
		_id: newContactdId,
	});

	if (!contactdExists) {
		ctx.throw(404, "Novo contato não encontrado");
	}

	await User.findOneAndUpdate(
		{ _id: "6395437151bbe4194302d7ca" },
		{ $push: { contacts: newContactdId } }
	);

	ctx.status = 201;
};
