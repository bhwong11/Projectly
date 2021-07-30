/* SECTION: External modules */
const express = require("express");
const session = require("express-sessions");
const MongoStore = require("connect-mongo")

/* SECTION: Internal modules */

/* SECTION: Instanced modules */
const app = express();

/* SECTION: Configure App  */
const PORT = 4000;

//we can now view the session with req.session
app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
      },
    })
);

/* SECTION: Middleware */

/* SECTION: Connect to controllers & routes */

/* SECTION: Server bind */
app.listen(PORT, () => {
    console.log(`App bound and listening on port: ${PORT}`);
});