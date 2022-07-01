import nodemailer from "nodemailer"

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string
  url: string
  token: string
}) {
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  const info = await transporter.sendMail({
    from: '"Test blog" <testblog@testblog.com>',
    to: email,
    subject: "Login to your account",
    html: `Login by  <a href="${url}/login#token=${token}">clicking here</a>`,
  })

  console.log("Preview URL: " + nodemailer.getTestMessageUrl(info))
}
