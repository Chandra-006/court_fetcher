# 🏛️ Court-Data Fetcher & Mini-Dashboard

## 📌 Overview

This is a Node.js + PostgresSQL web app that lets users input:
- Case Type
- Case Number
- Filing Year

It then:
- Simulates fetching case metadata and latest orders from a court website
- Stores the query and HTML result in a PostgreSQL database
- Displays the result on the page, including parties, filing date, next hearing, and order link

> 🔧 Built for Internship Task 1 — "Court Data Fetcher & Mini-Dashboard"

---

## ⚠️ Real Site Limitations (Explained)

The original goal was to scrape data from:
- Delhi High Court: [https://delhihighcourt.nic.in](https://delhihighcourt.nic.in)
- or any District Court (e.g., Faridabad): [https://districts.ecourts.gov.in](https://districts.ecourts.gov.in)

However:
- ✅ These sites are **geo-restricted** and did not load from our development environment
- ✅ Pages are **protected by CAPTCHA**, blocking automation
- ✅ No sample case numbers or test APIs are publicly available

### 🧪 Resolution:
We implemented a **mock scraper** that simulates real court responses.  
This ensures the full app functionality — UI, database, and flow — is demonstrated end-to-end.

---

## 🚀 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/court-dashboard.git
cd court-dashboard

2. Install Dependencies
npm install

3. Set Up .env File
Create a .env file in the root:

env

PORT=3000
DATABASE_URL=postgresql://yourusername:yourpassword@localhost:5432/court_data

4. Create PostgreSQL Database & Table
In your PostgreSQL CLI or GUI:

sql

CREATE DATABASE court_data;

CREATE TABLE queries (
  id SERIAL PRIMARY KEY,
  case_type TEXT,
  case_number TEXT,
  filing_year TEXT,
  raw_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

5. Start the Server

node server.js
Then visit: http://localhost:3000