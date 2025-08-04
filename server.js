// Load environment variables from .env file (e.g., DB credentials, port)
require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

// Import PostgreSQL connection pool and mock scraper function
const db = require('./src/db');
const fetchCourtData = require('./src/scraper');

// Use PORT from .env or fallback to 3000
const PORT = process.env.PORT || 3000;

// ---------- MIDDLEWARE ---------- //

// Parse URL-encoded form data from POST requests
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., styles.css) from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine for rendering HTML
app.set('view engine', 'ejs');

// ---------- ROUTES ---------- //

// Route: GET /
app.get('/', async (req, res) => {
  try {
    // Ping the database just to check the connection
    const result = await db.query('SELECT NOW()');
    console.log('🟢 DB connected at:', result.rows[0].now);
  } catch (err) {
    console.error('🔴 DB error:', err.message);
  }

  // Render the homepage form
  res.render('index');
});

// Route: POST /search
app.post('/search', async (req, res) => {
  const { caseType, caseNumber, filingYear } = req.body;

  try {
    // Call the scraper (currently returns mock data)
    const data = await fetchCourtData(caseType, caseNumber, filingYear);

    // Save query + raw HTML response to the database
    await db.query(
      'INSERT INTO queries (case_type, case_number, filing_year, raw_response) VALUES ($1, $2, $3, $4)',
      [caseType, caseNumber, filingYear, data.rawHtml]
    );

    // Send results back to the browser (simple HTML)
    res.send(`
      <h2>Scraped Data</h2>
      <p><strong>Parties:</strong> ${data.parties}</p>
      <p><strong>Filing Date:</strong> ${data.filingDate}</p>
      <p><strong>Next Hearing:</strong> ${data.nextHearing}</p>
      <p><a href="${data.pdfLink}" target="_blank">Download Latest Order</a></p>
      <a href="/">Back to home</a>
    `);
  } catch (err) {
    console.error('❌ Scraper error:', err.message);
    res.status(500).send('Failed to fetch case data.');
  }
});

// ---------- START SERVER ---------- //

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
