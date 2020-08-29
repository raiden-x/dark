import { pbkdf2, randomBytes } from 'crypto';
import { promisify } from 'util';

const promisedPbkdf2 = promisify(pbkdf2);
export const generateHash = async (password: string, salt: string): Promise<string> => {
  const buffer = await promisedPbkdf2(password, salt, 10000, 64, 'sha512');
  return buffer.toString('hex');
};

export const generateSalt = (): string => randomBytes(16).toString('base64');

export const jwtSecret = 'darkjwtsecret';

export const cookieSecret = 'darkcookiesecret';
