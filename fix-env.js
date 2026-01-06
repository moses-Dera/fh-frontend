import fs from 'fs';
const path = '.env.local';

try {
    let content = fs.readFileSync(path, 'utf8'); // Try reading as utf8 first
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1); // Remove BOM if present
    }

    // If it looks like garbage (null bytes), try reading as utf-16le
    if (content.includes('\0')) {
        content = fs.readFileSync(path, 'utf16le');
    }

    console.log('Original content length:', content.length);

    // Remove existing key to avoid duplicates
    const lines = content.split(/\r?\n/).filter(line => !line.trim().startsWith('INTERNAL_API_KEY='));

    // Add key
    lines.push('INTERNAL_API_KEY=bcsiiafgaklsaliqofmxdnxbxvfa');

    const newContent = lines.join('\n');
    fs.writeFileSync(path, newContent, 'utf8');

    console.log('Fixed .env.local');
    console.log(newContent);

} catch (e) {
    console.error('Error fixing env:', e);
}
