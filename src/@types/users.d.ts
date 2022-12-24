interface IUser {
	_id: Schema.Types.ObjectId;
	name: string;
	customId: string;
	password: string;
	contacts: Schema.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}
