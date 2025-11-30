const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

// Helper to read JSON file
const readJson = (filename) => {
    const filePath = path.join(__dirname, 'dist', filename);
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        }
    } catch (err) {
        console.error(`Error reading ${filename}:`, err);
    }
    return [];
};

// API Routes
app.get('/api/hospitals', (req, res) => {
    const data = readJson('hospitals.json');
    res.json(data);
});

app.get('/api/doctors', (req, res) => {
    // Aggregate all doctor files
    const doctors = [];
    const files = fs.readdirSync(path.join(__dirname, 'dist'));
    files.forEach(file => {
        if (file.startsWith('doctors_') && file.endsWith('.json')) {
            const hospitalDoctors = readJson(file);
            // Add source file info if needed
            doctors.push(...hospitalDoctors);
        }
    });
    res.json(doctors);
});

// Specific doctor list by hospital/source
app.get('/api/doctors/:source', (req, res) => {
    const source = req.params.source;
    const filename = `doctors_${source}.json`;
    const data = readJson(filename);
    if (data.length > 0) {
        res.json(data);
    } else {
        res.status(404).json({ error: 'Source not found or empty' });
    }
});

app.get('/api-doc', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'api-doc.html'));
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Health Directory API</h1>
        <p>Welcome! Please visit the <a href="/api-doc">API Documentation</a> for details.</p>
        <p>Quick Links:</p>
        <ul>
            <li><a href="/api/hospitals">/api/hospitals</a></li>
            <li><a href="/api/doctors">/api/doctors</a></li>
        </ul>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
