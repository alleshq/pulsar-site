import auth from "../../util/auth";
import config from "../../config";
import credentials from "../../credentials";
import jwt from "jsonwebtoken";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(401).json({err: "invalidSession"});

	//Get Address
	let address;
	if (req.headers["x-forwarded-for"]) {
		let ips = req.headers["x-forwarded-for"].split(", ");
		address = ips[ips.length - 1];
	} else {
		address = req.connection.remoteAddress;
	}

	//Generate Code
	res.json({
		code:
			config.connectPrefix +
			jwt.sign(
				{
					user: user.id,
					address,
					type: "authcode"
				},
				credentials.jwtSecret,
				{
					expiresIn: "1 minute"
				}
			)
	});
};
