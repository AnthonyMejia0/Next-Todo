import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const defaultSignOption: SignOption = {
  expiresIn: "1h",
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOption = defaultSignOption
) => {
  const secret = process.env.SECRET_KEY!;
  const token = jwt.sign(payload, secret, options);
  return token;
};

export const verifyJwt = (token: string) => {
  try {
    const secret = process.env.SECRET_KEY!;
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
