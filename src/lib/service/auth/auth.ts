import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    // Настройте ваш SMTP сервер здесь
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Подтвердите вашу регистрацию",
    html: `
      <h1>Добро пожаловать в наш интернет-магазин!</h1>
      <p>Пожалуйста, подтвердите ваш email, перейдя по следующей ссылке:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `,
  });
};
