
const fetchCourtData = async (caseType, caseNumber, filingYear) => {
  console.log('📦 [Mock Scraper] Returning simulated case data...');

  // Simulate a short delay (like real scraping)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    parties: `${caseType} ${caseNumber}/${filingYear} - Ramesh vs Suresh`,
    filingDate: '2022-11-15',
    nextHearing: '2025-09-20',
    pdfLink: 'https://example.com/sample-order.pdf',
    rawHtml: `
      <html>
        <body>
          <h1>Mock Case Output</h1>
          <p>Case: ${caseType} ${caseNumber}/${filingYear}</p>
          <p>Parties: Ramesh vs Suresh</p>
          <p>Filed on: 2022-11-15</p>
          <p>Next Hearing: 2025-09-20</p>
          <a href="https://example.com/sample-order.pdf">Order PDF</a>
        </body>
      </html>
    `
  };
};

module.exports = fetchCourtData;
