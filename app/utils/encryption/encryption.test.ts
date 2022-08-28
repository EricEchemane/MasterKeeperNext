import { expect } from "chai";
import Encryption from "./encryption";

describe('Encryption class', () => {
    describe('.encrypt', () => {
        const plainAccountPassword = 'password';
        let encryptedAccountPassword = '';

        it('should encrypt a string', () => {
            encryptedAccountPassword = Encryption.encrypt(plainAccountPassword);
            expect(encryptedAccountPassword).to.not.equal(plainAccountPassword);
        });

        it('should decrypt a string', () => {
            const decryptedAccountPassword = Encryption.decrypt(encryptedAccountPassword);
            expect(decryptedAccountPassword).to.equal(plainAccountPassword);
        });
    });
});