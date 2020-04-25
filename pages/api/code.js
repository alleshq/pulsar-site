import auth from "../../util/auth";
import config from "../../config";
import credentials from "../../credentials";
import jwt from "jsonwebtoken";

export default async (req, res) => {
	const user = await auth(req.headers.authorization);
	if (!user) return res.status(401).json({err: "invalidSession"});

	//Generate Code
	res.json({
		code:
			config.connectPrefix +
			jwt.sign(
				{
					user: user.id,
					type: "authcode"
				},
				credentials.jwtSecret,
				{
					expiresIn: "1 minute"
				}
			)
	});
};
