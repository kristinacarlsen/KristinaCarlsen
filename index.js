const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const app = express();

require('dotenv').config();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

app.get('/api', (req, res) => {
    res.send('API server: running');
})

app.post('/api/form', (req, res) => {
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // const msg = {
    //   to: 'kristida84@gmail.com',
    //   from: req.body.name,
    //   subject: 'Message from KC_Portfolio',
    //   text: req.body.message,
    // };
    // sgMail.send(msg);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_ADDRESS,
                pass: process.env.NODEMAILER_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: req.body.name,
            to: process.env.NODEMAILER_ADDRESS,
            replyTo: req.body.email,
            subject: 'Email from K_Carlsen Portfolio',
            text: req.body.message,
        };

        transporter.sendMail(mailOptions, function(err, data) {
            if(err) {
                console.log('Error: ', err);
            } else {
                console.log('Email sent successfully');
            }
        });

    });

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})