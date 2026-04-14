const mysql = require("mysql2/promise");

// Create a connection
const connectionDB = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "hetpatel@007",
  database: process.env.DB_NAME || "blog_db",
});


module.exports = connectionDB;
