const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_KEY },
  });
  const mail = {
    from: "infinity.store.ventas@gmail.com",
    to: "lautanaj@hotmail.com",
    subject: "Test Mail",
    html: `<div><h1 style="color:red">Hola</h1></div>`,
    attachments: [],
  };
  app.get("/email", async (req, res) => {
    await transport.sendMail(mail);
    res.send("Mail sent");
  });