// services/emailService.js
const nodemailer = require("nodemailer");
require("dotenv").config(); // Import dotenv to load environment variables

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Gmail SMTP server
  port: 465, // TLS port (use 465 for SSL)
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send registration confirmation email
const sendRegistrationEmail = async (email, firstName) => {
  console.log(`Preparing to send email to: ${email}`); // Log the recipient's email

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // recipient address
    subject: "Welcome to Karnataka Rajya Balija Yuvashakthi!",
    html: `Dear ${firstName},<br><br>
    Warm greetings and a hearty welcome to <strong>Karnataka Rajya Balija Yuvashakthi!</strong><br><br>
    We are thrilled to have you as a part of our growing family, dedicated to empowering the Balija community and creating meaningful opportunities for our youth. As a member of Karnataka Rajya Balija Yuvashakthi, you have joined hands with individuals who share a common vision for progress, unity, and development within our community. Your membership strengthens our commitment to fostering growth, knowledge, and leadership among Balija youth.<br><br>
    
    <strong>Here’s What You Can Expect:</strong><br>
    <ul>
      <li><strong>Community Support:</strong> We are here to support you in your personal and professional journey with networking, resources, and guidance.</li>
      <li><strong>Events & Programs:</strong> Be on the lookout for upcoming community events, training programs, workshops, and seminars designed to empower and elevate.</li>
      <li><strong>Updates & Opportunities:</strong> Stay informed about community news, career opportunities, and educational support programs.</li>
      <li><strong>Leadership Opportunities:</strong> We encourage our members to step forward, share their ideas, and take on leadership roles in various initiatives.</li>
    </ul>
    
    Your presence and participation are vital to achieving our collective goals, and we are here to assist you every step of the way. If you have any questions or suggestions, feel free to reach out to us at karnatakarajyabalijayuvasakthi@gmail.com.<br><br>
    
    Once again, welcome aboard! Let’s work together to make a difference and build a stronger future for the Balija community.<br><br>

    With warm regards,<br>
    KT Rajkumar<br>
    President<br>
    Karnataka Rajya Balija Yuvashakthi`,
  };

  try {
    console.log("Sending email..."); // Log before sending
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Function to send password reset email
const sendPasswordResetEmail = async (email, otp) => {
  console.log(`Sending OTP to: ${email}`); // Log the recipient's email

  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to: email, // recipient address
    subject: "Password Reset Request",
    html: `<p>We received a request to reset your password. Use the following OTP to reset your password:</p>
           <h2>${otp}</h2>
           <p>If you didn't request a password reset, please ignore this email.</p>`,
  };

  try {
    console.log("Sending password reset OTP..."); // Log before sending
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};

module.exports = { sendRegistrationEmail, sendPasswordResetEmail };
