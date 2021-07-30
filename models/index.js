/* SECTION: required database connection */
require("../config/db.connection");

/* SECTION: exports */
module.exports = {
    User: require("./User"),
    Task: require("./Task"),
    Board: require("./Board")
}