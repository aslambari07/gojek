import { otpCodes } from "../data/store.js";
import { findAccountByEmail, generateToken, registerCustomer } from "../services/auth.service.js";

export function register(req, res) {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !phone || !password) {
    return res.status(422).json({ message: "name, email, phone, password wajib diisi" });
  }

  const user = registerCustomer({ name, email, phone, password });
  return res.status(201).json({
    message: "Registrasi berhasil. OTP demo: 123456",
    data: user
  });
}

export function login(req, res) {
  const { email, password } = req.body;
  const account = findAccountByEmail(email);

  if (!account || account.password !== password) {
    return res.status(401).json({ message: "Email atau password salah" });
  }

  return res.json({
    message: "Login berhasil",
    token: generateToken(account),
    data: {
      id: account.id,
      name: account.name,
      role: account.role,
      email: account.email
    }
  });
}

export function sendOtp(req, res) {
  const { phone } = req.body;
  const entry = otpCodes.find((item) => item.phone === phone);

  return res.json({
    message: "OTP terkirim",
    data: { phone, otp: entry?.code || "123456" }
  });
}

export function verifyOtp(req, res) {
  const { phone, code } = req.body;
  const entry = otpCodes.find((item) => item.phone === phone && item.code === code);

  if (!entry) {
    return res.status(400).json({ message: "OTP tidak valid" });
  }

  entry.verified = true;
  return res.json({ message: "OTP verified" });
}

export function forgotPassword(req, res) {
  const { email } = req.body;
  return res.json({
    message: `Link reset password simulasi telah dikirim ke ${email}`
  });
}
