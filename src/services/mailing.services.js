import nodemailer from "nodemailer";
import { config } from "../config/mailer.config.js";

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: config.mailer.auth,
    });
  }

  getMessageTemplate(type, name) {
    let body = "";

    switch (type) {
      case "welcome":
        body += `¡Hola ${name}!
                Te damos la bienvenida a Identidad Digital.
                `;
        break;

      case "purchase":
        body += `¡Gracias por tu compra, ${name}!
                Tu pedido está siendo procesado y llegará a la dirección proporcionada.
                `;
        break;

      default:
        body += `Hola ${name}!
                Este es un mensaje de Identidad Digital.
                `;
        break;
    }

    body += `¡Saludos!`;

    return body;
  }

  async sendMail({ to, subject, type, name }) {
    const message = this.getMessageTemplate(type, name);

    const info = await this.transporter.sendMail({
      from: "Identidad Digital",
      to,
      subject,
      html: message,
      attachments: [],
    });
    console.log(message);
  }
}

export default MailService;
