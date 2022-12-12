import bcrypt from "bcrypt";
import { Context } from "koa";

import User from "../models/users";

interface IAuth {
	customId: string;
	password: string;
}

export default async (ctx: Context) => {
	const { customId, password } = ctx.request.body as IAuth;

	if (!customId || !password) {
		return ctx.throw(400, "Id e senha são obrigatórios");
	}

	const userData = await User.findOne({
		customId,
	}).select("+password");

	// parei aqui

	const user = userData;

	const passwordMatch = bcrypt.compareSync(password, userPassword || "");

	if (!user || passwordMatch) {
		return ctx.throw(404, "Usuário não encontrado");
	}

	if (user.password) {
		delete user.password;
	}
};
