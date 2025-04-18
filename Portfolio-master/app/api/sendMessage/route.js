import { emailTemplate } from '@/app/template/emailTemplate';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Environment Variables
const ALLOWED_ORIGIN = process.env.ALLOW_ORIGIN;
const API_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY;
const RECEIVER_EMAIL = process.env.MY_EMAIL;  // Ensure this is set in .env.local

export async function POST(req) {
  try {
    console.log('Request headers:', req.headers);  // Log headers
    const origin = req.headers.get('origin') || req.headers.get('referer');
    const apiKey = req.headers.get('x-api-key');

    // Security Check: Verify Origin and API Key
    if (!origin || !origin.startsWith(ALLOWED_ORIGIN) || apiKey !== API_KEY) {
      console.log('Unauthorized access');  // Log unauthorized access attempt
      return NextResponse.json(
        { message: 'Unauthorized access' },
        { status: 403 }
      );
    }

    const body = await req.json();
    console.log('Request body:', body);  // Log incoming body

    const { firstName, lastName, email, phone, subject, message } = body;

    // Validate Required Fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      console.log('Missing required fields');  // Log missing fields
      return NextResponse.json(
        { message: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Generate Email Content
    const emailHtmlContent = emailTemplate(firstName, lastName, email, phone, subject, message);

    // Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: 'My Portfolio <onboarding@resend.dev>',
      to: RECEIVER_EMAIL,
      subject: subject,
      text: `From: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html: emailHtmlContent
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { message: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Mail sent successfully.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
