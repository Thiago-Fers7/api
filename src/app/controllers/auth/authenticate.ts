import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Context } from "koa";

import User from "../../models/users";

export default async (ctx: Context) => {
	const { customId, password } = ctx.request.body as {
		customId: string;
		password: string;
	};

	const user = await User.findOne({ customId }).select("+password");

	if (!user) {
		return ctx.throw(404, "Usuário ou senha incorretos");
	}

	const isPasswordCorrect = bcrypt.compareSync(password, user.password);

	if (!isPasswordCorrect) {
		return ctx.throw(404, "Usuário ou senha incorretos");
	}

	const userWithoutPassword: Optional<IUser, "password"> = {
		_id: user._id,
		name: user.name,
		customId: user.customId,
		contacts: user.contacts,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	};

	const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
		expiresIn: "1d",
	});

	ctx.status = 200;
	ctx.body = { user: userWithoutPassword, token };
};
