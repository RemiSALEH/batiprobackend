const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors((req, res, next) => {
  const frontendOrigin = req.headers.origin;
  const allowedOrigins = [
    'http://localhost:4200', // Replace with actual frontend origin
    'https://my-frontend-app.com', // Replace with actual frontend origin
  ];

  if (allowedOrigins.includes(frontendOrigin)) {
    res.header('Access-Control-Allow-Origin', frontendOrigin);
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  } else {
    res.status(403).send('Origin not allowed');
  }
}));

app.post('/send-email', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'contact.batipro77@gmail.com',
      pass: 'olrk lzqb prfj grny'
    }
  });

  const mailOptions = {
    from: 'contact.batipro77.com',
    to: 'contact.batipro77@gmail.com',
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
