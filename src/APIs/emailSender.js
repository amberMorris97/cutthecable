const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'admin@galico.io', // your email
    pass: 'grxb dmbg hgsh eawu' // your email password
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = { from: 'admin@galico.io', to, subject, text };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send('Email sent: ' + info.response);
    }
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
