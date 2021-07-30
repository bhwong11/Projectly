/* SECTION: required database connection */
require("../config/db.connection");

/* SECTION: exports */
module.exports = {
    User: require("./User"),
}