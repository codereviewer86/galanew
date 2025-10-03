import nodemailer from 'nodemailer';
import { EMAIL_CONFIG } from '../config';

interface ContactFormData {
  name: string;
  email: string;
  phone_number: string;
  recruitment_id: string;
  resume?: Express.Multer.File;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.password
      }
    });
  }

  async sendContactForm(data: ContactFormData): Promise<void> {
    const { name, email, phone_number, recruitment_id, resume } = data;

    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: EMAIL_CONFIG.recipientEmail,
      subject: `New Job Application from ${name}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone_number}</p>
        <p><strong>Job Position:</strong> ${recruitment_id}</p>
        <p><strong>Application Date:</strong> ${new Date().toLocaleDateString()}</p>
        
        ${resume ? '<p><strong>Resume:</strong> Attached</p>' : '<p><strong>Resume:</strong> No file attached</p>'}
        
        <hr>
        <p><em>This email was sent from the Turkmen Gala website contact form.</em></p>
      `,
      attachments: resume ? [{
        filename: resume.originalname,
        content: resume.buffer
      }] : []
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationEmail(recipientEmail: string, name: string): Promise<void> {
    const mailOptions = {
      from: EMAIL_CONFIG.user,
      to: recipientEmail,
      subject: 'Thank you for your application - Turkmen Gala',
      html: `
        <h2>Thank you for your application!</h2>
        <p>Dear ${name},</p>
        <p>We have successfully received your job application. Our HR team will review your application and get back to you soon.</p>
        <p>Thank you for your interest in joining Turkmen Gala.</p>
        
        <hr>
        <p>Best regards,<br>
        Turkmen Gala HR Team</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}

export default new EmailService();
