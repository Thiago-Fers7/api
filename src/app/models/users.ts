import { Schema, model, Model } from "mongoose";

interface IUser {
	name: string;
	customId: string;
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
		},
	},
	{
		timestamps: true,
	}
);

schema.static("findByName", function (name: string) {
	return this.findOne({ name });
});

const User = model<IUser, IUserModel>("user", schema);

export default User;
