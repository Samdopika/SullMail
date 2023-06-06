const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/send-email', async (req, res) => {
  let { recipient, body } = req.body;

  // Create a Nodemailer transporter using Gmail
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
    }
  });

  // Define email options
  let mailOptions = {
    from: 'your-email@gmail.com',
    to: recipient,
    subject: 'Email from Node.js',
    text: body
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('There was an error while sending the email:', error);
    res.status(500).send('Error while sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
