const nodemailer = require("nodemailer");

const sendInviteEmail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Nova Dashboard" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You're Invited to Join a Team",
    html: `
      <p>Hello,</p>
      <p>You’ve been invited to join a team on Nova Dashboard.</p>
      <p>Click the link below to accept the invite (valid for 10 minutes):</p>
      <a href="${link}">${link}</a>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendInviteEmail;
