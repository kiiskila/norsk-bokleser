import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  text: string;
}

export class EmailService {
  static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await sgMail.send(options);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
