import auth from "../../../util/auth";
import db from "../../../db";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(401).json({err: "invalidSession"});
	if (typeof req.query.id !== "string")
		return res.status(400).json({err: "badRequest"});

	//Get Client
	const client = await db.Client.findOne({
		where: {
			id: req.query.id,
			userId: user.id
		},
		order: ["name"]
	});
	if (!client) return res.status(400).json({err: "invalidClient"});

	//Delete
	await client.destroy();

	res.json({});
};
