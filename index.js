const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

const AWS_REGION_SES = process.env.AWS_REGION_SES;
const DEFAULT_FROM_EMAIL = process.env.DEFAULT_FROM_EMAIL;
const DEFAULT_TO_EMAIL = process.env.DEFAULT_TO_EMAIL;

AWS.config.update({ region: AWS_REGION_SES });

const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const transporter = nodemailer.createTransport({
  SES: { ses, aws: { region: AWS_REGION_SES } },
});

exports.handler = async (event) => {
  console.log("event: ", event);
  const { to, from, subject, text } = event;

  if (
    typeof to !== "string" ||
    typeof from !== "string" ||
    typeof subject !== "string" ||
    typeof text !== "string"
  ) {
    console.error("Invalid input parameters");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid input parameters" }),
    };
  }

  const params = {
    from: from || DEFAULT_FROM_EMAIL,
    to: to || DEFAULT_TO_EMAIL,
    subject,
    text,
    //source: from // Add the 'source' property with the value of 'from'
  };

  try {
    let info = await transporter.sendMail(params);
    console.log("Message sent: %s", info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    console.error("Error sending message: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending message", error: error }),
    };
  }
};
