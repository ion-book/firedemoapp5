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
