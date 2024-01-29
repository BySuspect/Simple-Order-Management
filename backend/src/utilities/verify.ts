import jwt from "jsonwebtoken";

export const verifyToken: any = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload;
    return decoded;
  } catch (err) {
    return err;
  }
};
