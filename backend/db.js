const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Database connection configuration for Aiven MySQL
const pool = mysql.createPool({
  host: 'groundbookingdb-oshanhelinda8-7331.f.aivencloud.com',
  port: 23085,
  user: 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true // Aiven requires SSL
  }
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.error('Make sure XAMPP MySQL is running and database "cricket_db" exists');
  } else {
    console.log('Database connected successfully! (Via db.js)');
    connection.release();
  }
});

// Export for use in other files
module.exports = pool.promise();