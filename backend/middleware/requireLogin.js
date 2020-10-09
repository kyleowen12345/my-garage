import jwt from "jsonwebtoken";
import { secret } from "../server.js";
import { User } from "../models/user.js";
export default (req, res, next) => {
	const { authorization } = req.headers;
	const token = authorization.replace("Bearer", "");
	if (!authorization) {
		return res.status(401).json({ error: "you must be logged in" });
	}

	jwt.verify(token, secret, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "you must be logged in" });
		}
		const { _id } = payload;
		User.findById(_id).then((userdata) => {
			req.user = userdata;
			next();
		});
	});
};
