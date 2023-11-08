const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:4200', // Change this to match your frontend URL
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  optionsSuccessStatus: 204,
  credentials: true, // If your frontend sends cookies
};

app.use(cors(corsOptions));

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
