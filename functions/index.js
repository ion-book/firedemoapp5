'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha

const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const APP_NAME = 'Firedemoapp5';

/**
 * Enviar correo de bienvenida.
 */

 exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
      const user = event.data; // The Firebase user.
    
      const email = user.email; // The email of the user.
      const displayName = user.displayName; // The display name of the user.
    
      return sendWelcomeEmail(email, displayName);
    });

/**
 * Enviar correo de despedida
 */

exports.sendByeEmail = functions.auth.user().onDelete(event => {
    
      const user = event.data;
    
      const email = user.email;
      const displayName = user.displayName;
    
      return sendGoodbyEmail(email, displayName);
    });

// Enviar un mensaje de bienvenida al usuario especifico.
function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: email
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `Bienvenido a ${APP_NAME}!`;
    mailOptions.text = `Hola ${displayName || ''}! Bienvenido a ${APP_NAME}. I hope you will enjoy our service.`;
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('Correo nuevo enviado:', email);
    });
  }