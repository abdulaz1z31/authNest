import * as bcrypt from 'bcrypt';

export class Hashing {
  static async generate(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  static async compare(
    password: string,
    hashPasword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPasword);
  }
}
