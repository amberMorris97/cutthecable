const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email service
  auth: {
    user: 'cutthecable@techie.com ', // your email
    pass: 'DIIYJDCY5NIJ3CYPPL67' // your email password
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = { from: 'cutthecable@techie.com', to, subject, text };

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
