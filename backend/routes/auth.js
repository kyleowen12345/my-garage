import express from "express";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secret } from "../server.js";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

const router = express.Router();
dotenv.config();

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.API_KEY,
		},
	})
);

router.post("/signup", (req, res) => {
	const {
		name,
		email,
		password,
		Seller,
		profilePic,
		contactNumber,
		country,
		State,
		city,
		zipcode,
		createdAt,
	} = req.body;
	if (!email || !password || !name) {
		return res.status(422).json({ error: "complete the all the fields" });
	}
	if (name === password || email === password) {
		return res
			.status(422)
			.json({ error: "your name or email should not be your password" });
	}
	User.findOne({ email: email })
		.then((savedUser) => {
			if (savedUser) {
				return res.status(422).json({ error: "email already exists" });
			}
			if (password.length < 5 || password.length > 30) {
				return res
					.status(422)
					.json({ error: "password must contain 5-30 characters " });
			}
			bcrypt.hash(password, 12).then((password) => {
				const user = new User({
					email,
					name,
					password,
					Seller,
					profilePic,
					contactNumber,
					country,
					State,
					city,
					zipcode,
					createdAt,
				});
				user
					.save()
					.then((user) => {
						transporter.sendMail({
							to: user.email,
							from: "gakyleowen@gmail.com",
							subject: "signup success",
							html: "<h1>Welcome to MY-GARAGE<h1>",
						});
						res.status(200).json({ message: "saved successfully", user });
					})
					.catch((err) => {
						res.status(422).json({
							error: err.errors.name
								? "name should not have special characters and must be longer than 5 characters"
								: err.errors.email
								? "email is invalid"
								: "password error",
						});
					});
			});
		})
		.catch((err) => {
			res.status(400).send(err);
		});
});
router.post("/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: "complete the all the fields" });
	}
	User.findOne({ email: email }).then((savedUser) => {
		if (!savedUser) {
			return res.status(422).json({ error: "User does not exist" });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then((match) => {
				if (match) {
					const token = jwt.sign({ _id: savedUser._id }, secret);
					const { _id } = savedUser;
					res.json({
						token,
						_id,
					});
				} else {
					return res.status(422).json({ error: "Invalid email or password" });
				}
			})
			.catch((err) => {
				res.json(err);
			});
	});
});
router.post("/createSeller/:id", async (req, res) => {
	try {
		const { Seller } = req.body;
		let user = await User.findByIdAndUpdate({ _id: req.params.id });
		if (!user) {
			return res.status(422).json({ error: "User does not exist" });
		}
		user.Seller = Seller;
		user.save().then((result) => {
			res.json({
				result,
				message:
					result.Seller === true
						? "You are now a seller"
						: "You are not a seller",
			});
		});
	} catch (error) {
		res.json({ error: "User unknown" });
	}
});
router.post("/reset-password", (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
		}
		const token = buffer.toString("hex");
		User.findOne({ email: req.body.email }).then((user) => {
			if (!user) {
				return res
					.status(422)
					.json({ error: "User with this email does not exist" });
			}
			user.resetToken = token;
			user.expireToken = Date.now() + 3600000;
			user.save().then((result) => {
				transporter.sendMail({
					to: user.email,
					from: "gakyleowen@gmail.com",
					subject: "Password reset",
					html: `
					<p>You requested for password reset</p>
					<h2>Click in this <a href="http://localhost:3000/reset-password/${token}"> link </a>to reset password</h2>
					`,
				});
				res.json({ message: "check your email" });
			});
		});
	});
});
router.post("/new-password", (req, res) => {
	const newPassword = req.body.password;
	const sentToken = req.body.token;
	User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
		.then((user) => {
			if (!user) {
				return res.status(422).json({ error: "Try again session expired" });
			}
			bcrypt.hash(newPassword, 12).then((hashedpassword) => {
				user.password = hashedpassword;
				user.resetToken = undefined;
				user.expireToken = undefined;
				user.save().then((saveduser) => {
					res.json({ message: "password update success" });
				});
			});
		})
		.catch((err) => {
			console.log(err);
			res.json({ message: err });
		});
});

export default router;
