# Nodemailer Serverless Template
Template repository deploy your serverless function for email sending with Github Actions workflow setup

This repository contains a template for deploying a serverless function to send emails using AWS Simple Email Service (SES) and Nodemailer. The function is deployed using GitHub Actions.

## Project Structure

- `index.js`: This is the main file where the serverless function is defined. It uses Nodemailer and AWS SES to send emails.
- `.github/workflows/deploy.yml`: This is the GitHub Actions workflow file. It is triggered manually and deploys the serverless function to AWS Lambda.
- `serverless.yml`: This is the Serverless Framework configuration file. It defines the service and function.

## Setup

1. Initialize a new Node.js project and install the necessary dependencies.
2. Verify your email address or domain in the AWS SES console.
3. Obtain your AWS access key ID and secret access key and add them as secrets in your GitHub repository.
4. Define your serverless function in `index.js`.
5. Define your GitHub Actions workflow in `.github/workflows/deploy.yml`.
6. Define your service and function in `serverless.yml`.
7. Deploy your service using the GitHub Actions workflow.

## Usage

After deploying the service, you can invoke the function in AWS Lambda to send an email.

## License

[MIT](LICENSE)