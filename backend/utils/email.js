import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const latewaEmail = process.env.LATEWA_EMAIL || 'elizabethonyango9898@gmail.com';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

export const sendContactEmails = async (name, email, message, interest) => {
  try {
    // Send to Latewa
    await transporter.sendMail({
      from: `"Latewa International NGO Website" <${process.env.EMAIL_USER}>`,
      to: latewaEmail,
      subject: `New Contact Inquiry: ${interest}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Interest:</strong> ${interest}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Send thank you to user
    await transporter.sendMail({
      from: `"Latewa International NGO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Latewa International NGO',
      html: `
        <h2>Thank you for reaching out, ${name}!</h2>
        <p>We have received your message regarding <strong>${interest}</strong>.</p>
        <p>Our team will get back to you as soon as possible.</p>
        <p>Best regards,<br>The Latewa International NGO Team</p>
      `,
    });
  } catch (error) {
    console.error('Error sending contact emails:', error);
  }
};

export const sendInvolvementEmail = async (name, email, type) => {
  let subject = '';
  let message = '';

  if (type === 'partner') {
    subject = 'Thank you for your interest in partnering with Latewa International NGO';
    message = 'We are excited about the possibility of partnering with you to create a lasting impact in our community.';
  } else if (type === 'volunteer') {
    subject = 'Thank you for volunteering with Latewa International NGO';
    message = 'Your willingness to give your time and skills is greatly appreciated. We will review your application and get back to you shortly.';
  } else if (type === 'donor') {
    subject = 'Thank you for your generous donation to Latewa International NGO';
    message = 'Your support helps us continue our mission and reach more people in need. We are truly grateful for your contribution.';
  }

  try {
    await transporter.sendMail({
      from: `"Latewa International NGO" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <h2>Hello ${name},</h2>
        <p>${message}</p>
        <p>Our team will contact you soon with more information.</p>
        <p>Best regards,<br>The Latewa International NGO Team</p>
      `,
    });
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
  }
};

export const sendOrderEmail = async (order, type) => {
  const { id, name, email, items, total, status } = order;
  const trackingUrl = `${frontendUrl}/track-order?orderId=${id}&email=${email}`;

  let subject = '';
  let title = '';
  let body = '';

  if (type === 'received') {
    subject = `Order Received - ${id}`;
    title = 'Thank you for your order!';
    body = 'We have received your order and it is now being processed.';
  } else if (type === 'delivery') {
    subject = `Order Set for Delivery - ${id}`;
    title = 'Your order is on its way!';
    body = 'Good news! Your order has been set for delivery.';
  } else if (type === 'completed') {
    subject = `Order Completed - ${id}`;
    title = 'Your order is complete!';
    body = 'Thank you for shopping with us. Your order has been successfully delivered and completed.';
  }

  try {
    await transporter.sendMail({
      from: `"Latewa International NGO Shop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #4CAF50;">${title}</h2>
          <p>Hello ${name},</p>
          <p>${body}</p>
          <p><strong>Order ID:</strong> ${id}</p>
          <p><strong>Total:</strong> KES ${total}</p>
          <div style="margin: 20px 0;">
            <a href="${trackingUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Your Order</a>
          </div>
          <p>If the button above doesn't work, copy and paste this link into your browser:</p>
          <p>${trackingUrl}</p>
          <hr>
          <p>Best regards,<br>The Latewa International NGO Shop Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error(`Error sending order ${type} email:`, error);
  }
};
