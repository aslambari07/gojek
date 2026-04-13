import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { drivers, otpCodes, users } from "../data/store.js";

export function generateToken(account) {
  return jwt.sign(
    { sub: account.id, role: account.role, email: account.email },
    env.jwtSecret,
    { expiresIn: "7d" }
  );
}

export function findAccountByEmail(email) {
  return [...users, ...drivers].find((account) => account.email === email);
}

export function registerCustomer(payload) {
  const user = {
    id: `USR-${users.length + 1}`,
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
    role: "customer",
    walletBalance: 0,
    status: "pending_verification"
  };

  users.push(user);
  otpCodes.push({ phone: payload.phone, code: "123456", verified: false });
  return user;
}
