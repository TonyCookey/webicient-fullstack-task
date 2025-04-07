import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "";
type MyPayload = { id: string };

type AuthPayload = { user?: MyPayload; error?: string; status?: number };

export const hashPassword = async (password: string) => bcrypt.hash(password, 10);
export const verifyPassword = async (password: string, hash: string) => bcrypt.compare(password, hash);
export const generateToken = (user: { id: string; email: string }) => jwt.sign(user, SECRET, { expiresIn: "7d" });
export const verifyToken = (token: string) => jwt.verify(token, SECRET) as MyPayload;

export function authenticate(req: Request): AuthPayload {
  const token = req.headers.get("authorization")?.replace("Bearer ", "") ?? "";
  const user = verifyToken(token);

  if (!user) {
    return { error: "Unauthorized", status: 401 };
  }

  return { user };
}
