import { log } from "@/utils/logger";
import { Users } from "@prisma/client";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function mail(user: Users) {
  const testAccount: nodemailer.TestAccount =
    await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let successMessage: (string | Mail.Address)[] = [];

  // Retry send mail process if failed
  while (successMessage.length == 0) {
    const message = await transporter.sendMail({
      from: "test@mailer.com",
      to: user.email,
      subject: "Happy Birthday, Here's Your Promo!",
      text: `Happy Birthday ${user.name}, login to your account now to claim your special promo!`,
    });

    successMessage = message.accepted;
  }

  log(`email send to: ${user.email}`);
}
