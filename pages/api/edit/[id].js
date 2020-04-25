import auth from "../../../util/auth";
import db from "../../../db";
import config from "../../../config";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(401).json({err: "invalidSession"});
	if (
		typeof req.query.id !== "string" ||
		typeof req.body.name !== "string" ||
		req.body.name.trim().length < config.inputBounds.name.min ||
		req.body.name.trim().length > config.inputBounds.name.max
	)
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

	//Update
	await client.update({
		name: req.body.name.trim()
	});

	res.json({});
};
