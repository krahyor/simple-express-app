
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 3000;

// MySQL database connection configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "username",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "database_name"
};

let connection;
try {
  connection = mysql.createConnection(dbConfig);
  connection.connect((err) => {
    if (err) {
      console.warn('Warning: Could not connect to MySQL database: ' + err.stack);
    } else {
      console.log('Connected to MySQL database as id ' + connection.threadId);
    }
  });
} catch (err) {
  console.warn('Warning: MySQL connection setup failed:', err);
}

// Middleware to log request method and URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route handling
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

