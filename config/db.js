const mysql = require("mysql");
const conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_spp"

});
conn.getConnection((err) => {
if(err){
    throw err
} else {
    console.log("DB Connected")
}
});
module.exports = conn;