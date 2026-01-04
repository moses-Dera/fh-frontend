const https = require('https');

async function testSerper() {
    const apiKey = '37344f27e4f5cfda4608a23795f855f9de1ab13d';
    const query = 'frontend';

    console.log(`Testing Serper with query: ${query}`);

    const data = JSON.stringify({
        q: `${query} internships 2024`,
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
            console.log('Status:', res.statusCode);
            try {
                const json = JSON.parse(body);
                if (json.organic && json.organic.length > 0) {
                    console.log('SUCCESS! Found results.');
                    const first = json.organic[0];
                    console.log('Sample Title:', first.title);
                    console.log('Sample Link:', first.link);
                } else {
                    console.log('Response OK but no organic results:', body);
                }
            } catch (e) {
                console.error('Parse error:', e);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.write(data);
    req.end();
}

testSerper();
