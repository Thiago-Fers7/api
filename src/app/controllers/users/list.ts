import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const users = await User.find();

	ctx.body = users;
};
