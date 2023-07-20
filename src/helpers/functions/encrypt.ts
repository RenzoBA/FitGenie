import { AES, enc } from "crypto-js";

const secretKey = process.env.NEXT_PUBLIC_AES_SECRET_KEY!;

export const encrypt = (string: string) => {
  return AES.encrypt(string, secretKey).toString();
};

export const decrypt = (ciphertext: string) => {
  const encryptedWithoutSpaces = ciphertext.replace(/\s/g, "+");
  const bytes = AES.decrypt(encryptedWithoutSpaces, secretKey);
  return bytes.toString(enc.Utf8);
};
