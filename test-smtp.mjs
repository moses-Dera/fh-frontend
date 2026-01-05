// Test SMTP connection directly
import nodemailer from 'nodemailer';

async function testSMTP() {
    console.log('Testing SMTP connection...\n');

    const config = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'okonkwomoses158@gmail.com',
            pass: 'rhzu pott qtpo pknp'
        },
        connectionTimeout: 10000, // 10 second timeout
        greetingTimeout: 10000,
    };

    console.log('SMTP Config:', {
        host: config.host,
        port: config.port,
        user: config.auth.user,
        passLength: config.auth.pass?.length
    });

    try {
        const transporter = nodemailer.createTransport(config);

        console.log('Verifying connection...');
        await transporter.verify();
        console.log('✅ SMTP connection successful!');

        console.log('Sending test email...');
        const info = await transporter.sendMail({
            from: '"FreelanceHub" <okonkwomoses158@gmail.com>',
            to: 'okonkwomoses158@gmail.com',
            subject: 'SMTP Test from FreelanceHub',
            text: 'If you receive this, SMTP is working!',
            html: '<h1>SMTP Test</h1><p>If you receive this, SMTP is working!</p>'
        });

        console.log('✅ Email sent! Message ID:', info.messageId);

    } catch (error) {
        console.error('❌ SMTP Error:', error.message);
        console.error('Error code:', error.code);
        console.error('Full error:', error);
    }
}

testSMTP();
