import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Email transporter (Gmail example)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Send Order Endpoint
app.post("api/send", async (req, res) => {
  try {
    const data = req.body;

    // Email to Buyer
    const buyerMail = {
      from: `"Your Store" <${process.env.MAIL_USER}>`,
      to: data.email,
      subject: `Your Order Confirmation – Ref: ${data.reference}`,
      text: `
Hello ${data.fullName},

Thank you for your order!

Reference: ${data.reference}
Total: ${data.total}

Items:
${data.items}

We will contact you shortly.
`,
    };

    // Email to Owner
    const ownerMail = {
      from: `"Store Order Bot" <${process.env.MAIL_USER}>`,
      to: process.env.OWNER_EMAIL,
      subject: `New Order Received – Ref: ${data.reference}`,
      text: `
New Order Received.

Reference: ${data.reference}
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}, ${data.city}, ${data.state} ${data.postalCode}
Total: ${data.total}

Items:
${data.items}
`,
    };

    await transporter.sendMail(buyerMail);
    await transporter.sendMail(ownerMail);

    res.json({ success: true, message: "Emails sent" });
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.status(500).json({ success: false, error: err });
  }
});

app.get("/", async (req, res) => {
  res.send("Email Service API is running ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);