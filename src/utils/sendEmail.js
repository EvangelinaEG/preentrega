
import nodemailer from 'nodemailer';
import { objectConfig } from '../config/index.js'; 

const { gmail_pass, gmail_user } = objectConfig;

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587, 
    secure: false,
    auth: {
        user: gmail_user,
        pass: gmail_pass,
    },
    tls: {
        rejectUnauthorized: false // Ignorar certificados no válidos
    }
});

const sendEmail = async ({ userEmail, subject, html }) => {
    return await transport.sendMail({
        from: 'Email de prueba <evange.gomes@gmail.com>',
        to: userEmail,
        subject,
        html,
    });
};

export default sendEmail; 
