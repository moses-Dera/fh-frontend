import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { to, subject, html, text, apiKey } = body;

        // Secure this endpoint
        const envKey = process.env.INTERNAL_API_KEY;
        console.log(`[Email API Debug] Received Key: '${apiKey}' (len: ${apiKey?.length})`);
        console.log(`[Email API Debug] Env Key: '${envKey}' (len: ${envKey?.length})`);
        console.log(`[Email API Debug] Match: ${apiKey === envKey}`);

        if (apiKey !== envKey) {
            console.warn('[Email API Debug] Authentication Failed');
            return NextResponse.json(
                { error: 'Unauthorized', debug: { receivedLen: apiKey?.length, envLen: envKey?.length } },
                { status: 401 }
            );
        }

        if (!to || !subject || (!html && !text)) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Configure Transporter from Env Vars
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM || '"FreelanceHub" <no-reply@freelancehub.com>',
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json({
            message: 'Email sent successfully',
            messageId: info.messageId
        });

    } catch (error: unknown) {
        console.error('Email sending error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to send email', details: errorMessage },
            { status: 500 }
        );
    }
}
