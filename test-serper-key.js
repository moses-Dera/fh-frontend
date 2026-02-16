
const https = require('https');
const fs = require('fs');
const path = require('path');

// Read .env.local manually since we don't have dotenv here or to avoid dep issues
try {
    const envPath = path.resolve('c:/Users/HomePC/Desktop/fh/fh-frontend/.env.local');
    if (!fs.existsSync(envPath)) {
        console.error('No .env.local found');
        process.exit(1);
    }
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/SERPAPI_KEY=([^\r\n]+)/);

    if (!match) {
        console.error('SERPAPI_KEY not found in .env.local');
        process.exit(1);
    }

    const apiKey = match[1].trim();
    console.log('Testing Key:', apiKey.substring(0, 5) + '...');

    const data = JSON.stringify({
        q: "software engineering internships 2024",
        num: 5
    });

    const options = {
        hostname: 'google.serper.dev',
        path: '/search',
        method: 'POST',
        headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json'
        }
    };

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log('Status Code:', res.statusCode);
            if (res.statusCode === 200) {
                console.log('Success! This is a Valid Serper.dev Key.');
                const json = JSON.parse(body);
                console.log('Result Count:', json.organic ? json.organic.length : 0);
            } else {
                console.log('Failed. Response:', body);
                console.log('This might be a SerpApi key, not Serper.dev');
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request Error:', e);
    });

    req.write(data);
    req.end();

} catch (err) {
    console.error('Script Error:', err);
}
