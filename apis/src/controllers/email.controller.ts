import { NextFunction, Request, Response } from 'express';
import emailService from '../services/email.service';
import { HttpException } from '../exceptions/HttpException';

export class EmailController {
  public sendContactForm = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone_number, recruitment_id } = req.body;
      const resume = req.file;

      // Validate required fields
      if (!name || !email || !phone_number || !recruitment_id) {
        throw new HttpException(400, 'All fields are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new HttpException(400, 'Invalid email format');
      }

      const contactData = {
        name: name.trim(),
        email: email.trim(),
        phone_number: phone_number.trim(),
        recruitment_id: recruitment_id.trim(),
        resume
      };

      // Send emails
      await emailService.sendContactForm(contactData);
      await emailService.sendConfirmationEmail(email, name);

      res.status(200).json({
        success: true,
        message: 'Application submitted successfully. You will receive a confirmation email shortly.'
      });
    } catch (error) {
      if (error instanceof HttpException) {
        res.status(error.status).json({
          success: false,
          message: error.message
        });
      } else {
        console.error('Email sending error:', error);
        res.status(500).json({
          success: false,
          message: 'Failed to send application. Please try again later.'
        });
      }
    }
  };
}

export default new EmailController();
