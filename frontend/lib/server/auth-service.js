import jwt from "jsonwebtoken";
import { env } from "./env.js";
import { drivers, users } from "./store.js";

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
