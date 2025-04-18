// templates/emailTemplate.js

export const emailTemplate = (firstName, lastName, email, phone, subject, message) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message from My Portfolio</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f9;
      }
      .email-container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        padding: 20px;
      }
      .header {
        text-align: center;
        background-color: #4CAF50;
        padding: 20px;
        color: #fff;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
      }
      .content {
        padding: 20px;
        color: #333;
        line-height: 1.6;
      }
      .content p {
        margin: 10px 0;
      }
      .footer {
        text-align: center;
        padding: 10px;
        font-size: 14px;
        color: #777;
        background-color: #f9f9f9;
        border-radius: 0 0 8px 8px;
      }
      .footer a {
        color: #4CAF50;
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <h1>Message from My Portfolio</h1>
      </div>
      <div class="content">
        <p><strong>From:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      <div class="footer">
        <p>Sent via My Portfolio</p>
        <p><a href="${process.env.ALLOW_ORIGIN}" target="_blank">Visit my portfolio</a></p>
      </div>
    </div>
  </body>
  </html>
`;

