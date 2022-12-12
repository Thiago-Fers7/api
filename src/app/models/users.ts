import bcrypt from "bcrypt";
import { Schema, model, Model } from "mongoose";

interface IUser {
	_id: Schema.Types.ObjectId;
	name: string;
	customId: string;
	password: string;
	contacts: Schema.Types.ObjectId[];
}

interface IUserModel extends Model<IUser> {
	findByName(name: string): Promise<IUser>;
}

const schema = new Schema<IUser>(
	{
		name: { type: String, required: [true, "Nome é obrigátorio"] },
		customId: {
			type: String,
			required: [true, "CustomId é obrigátorio"],
			index: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, "Senha é obrigátoria"],
			select: false,
		},
		contacts: [{ type: Schema.Types.ObjectId, ref: "user" }],
	},
	{
		timestamps: true,
	}
);

schema.pre("save", function (next) {
	this.password = bcrypt.hashSync(this.password, 10);

	next();
});

schema.static("findByName", function (name: string) {
	return this.findOne({ name });
});

const User = model<IUser, IUserModel>("user", schema);

export default User;
