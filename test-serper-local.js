const http = require('http');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/internships?q=frontend',
    method: 'GET'
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status Code:', res.statusCode);
        try {
            const json = JSON.parse(data);
            if (json.internships && json.internships.length > 0) {
                console.log(`Success! Found ${json.internships.length} internships.`);
                console.log('First result:', JSON.stringify(json.internships[0], null, 2));
            } else {
                console.log('Response OK but no internships found:', data);
            }
        } catch (e) {
            console.log('Failed to parse response:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.end();
