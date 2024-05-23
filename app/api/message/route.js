import dotenv from "dotenv";
import { NextResponse } from "next/server";
dotenv.config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const body = await req.json();

  let token = body?.captchaToken;
  if (!token) {
    return NextResponse.json(
      {
        message:
          "Woops we encountered an error. Please send an email to hello (at) getpaid.asia for assistance.",
      },
      { status: 400 }
    );
  }

  if (!body.email || !body.serviceType) {
    return NextResponse.json(
      {
        message:
          "Invalid credentials supplied. Please reach out to hello (at) getpaid.asia for assistance.",
      },
      { status: 400 }
    );
  }

  let htmlToBeSent = `
  <div class="container" style="margin-left: 20px;margin-right: 20px;">
    <div style="font-size: 16px;">
      <h4>You've got a new enquiry.</h4>
      <p>Name: ${body.name}</p>
      <p>Email: ${body.email}</p>
      <p>Phone Number: ${body.phoneNumber}</p>
    </div>
    <div style="font-size: 16px;">
      <p>Message:</p>
      <p>${body.about}</p>
      <br>
    </div>
  </div>
  `;

  try {
    await sgMail.send({
      to: process.env.EMAIL_RECEIVER,
      from: process.env.EMAIL_SENDER,
      subject: `SaltandPeps Website Enquiry: [${
        body.serviceType || "Unknown"
      }]`,
      html: htmlToBeSent,
    });
  } catch (error) {
    console.dir(error, { depth: null });
    return NextResponse.json(
      {
        message:
          "There has been an error sending this message. Please reach out to peps.hw@gmailcom for assistance.",
      },
      { status: error.statusCode || 500 }
    );
  }

  return NextResponse.json({ message: "Message Sent!" });
}
