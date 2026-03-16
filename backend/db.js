const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Database connection configuration for Aiven MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'groundbookingdb-oshanhelinda8-7331.f.aivencloud.com',
  port: parseInt(process.env.DB_PORT) || 23085,
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // Set to false since the CA is not provided locally
  }
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.error('Make sure the Aiven instance is running and accessible.');
  } else {
    console.log('Database connected successfully! (Via db.js)');
    connection.release();
  }
});

// Export for use in other files
module.exports = pool.promise();