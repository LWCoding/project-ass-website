require("./db/mongoose.js");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const navRouter = require("./routers/nav.js");
const accountRouter = require("./routers/account.js");
const MongoStore = require("connect-mongo");
const User = require("./models/user.js");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(cors());

// Express-session
app.use(
	session({
		store: new MongoStore({
			db: "session",
			mongoUrl: process.env.MONGODB_URL,
		}),
		secret: process.env.COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		},
	})
);

// Router imports
app.use(navRouter);
app.use(accountRouter);

app.listen(port, () => {
	console.log(`Listening on port ${port}.`);
});
