const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

const AWS_REGION = process.env.AWS_REGION;
const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL;
const DEFAULT_TO_EMAIL = process.env.DEFAULT_TO_EMAIL;

AWS.config.update({region: AWS_REGION});

const ses = new AWS.SES({apiVersion: '2010-12-01'});
const transporter = nodemailer.createTransport({
    SES: { ses, aws: { region: AWS_REGION } },
});

exports.handler = async (event) => {
    console.log('event: ', event)
    const params = {
        from: DEFAULT_FROM_EMAIL,
        to: DEFAULT_TO_EMAIL,
        subject: 'Hello from AWS SES!',
        text: 'Hello AWS SES!',
    };

    try {
        let info = await transporter.sendMail(params);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending message: ', error);
    }
};