import crypto from 'crypto';

export default class Encryption {
    private static algorithm = 'aes-256-cbc';
    private static iv = crypto.randomBytes(16);
    private static key = crypto.randomBytes(32);

    static encrypt = (plainAccountPassword: string) => {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encryptedData = cipher.update(plainAccountPassword, "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    };

    static decrypt = (encryptedAccountPassword: string) => {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decryptedData = decipher.update(encryptedAccountPassword, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    };
}