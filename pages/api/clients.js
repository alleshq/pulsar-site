import auth from "../../util/auth";
import db from "../../db";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(400).json({err: "invalidSession"});

	//Get Clients
	const clients = await db.Client.findAll({
		where: {
			userId: user.id
		},
		order: ["name"]
	});

	res.json({
		clients: clients.map(c => ({
			id: c.id,
			name: c.name,
			createdAt: c.createdAt
		}))
	});
};
