import nodemailer from 'nodemailer';

const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Foodie Contact: ${subject}`,
      html: `
        <h3>New message from ${name}</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { sendContact };