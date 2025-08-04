// Import the PostgreSQL connection pool class
const { Pool } = require('pg');

// Load environment variables (e.g., DATABASE_URL from .env)
require('dotenv').config();

// Initialize a new pool using the database URL
// This automatically manages connection reuse
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Export the pool so other modules (e.g., server.js) can use it
module.exports = pool;
