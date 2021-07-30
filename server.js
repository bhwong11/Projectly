/* SECTION: External modules */
const express = require("express");

/* SECTION: Internal modules */

/* SECTION: Instanced modules */
const app = express();

/* SECTION: Configure App  */
const PORT = 4000;

/* SECTION: Middleware */

/* SECTION: Connect to controllers & routes */

/* SECTION: Server bind */
app.listen(PORT, () => {
    console.log(`App bound and listening on port: ${PORT}`);
});