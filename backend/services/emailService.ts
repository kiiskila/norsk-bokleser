import sgMail from "@sendgrid/mail";

// Set SendGrid API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

/**
 * Interface representing the structure of email options.
 */
interface EmailOptions {
  to: string; // Recipient email address
  from: string; // Sender email address
  subject: string; // Subject of the email
  text: string; // Body of the email
}

/**
 * EmailService Class
 * Provides functionality to send emails using SendGrid.
 */
export class EmailService {
  /**
   * Sends an email with the specified options.
   *
   * @param {EmailOptions} options - The email options including to, from, subject, and text.
   * @throws Will throw an error if sending the email fails.
   */
  static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await sgMail.send(options);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error; // Re-throw the error for the caller to handle
    }
  }
}
