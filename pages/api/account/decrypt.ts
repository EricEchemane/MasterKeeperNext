import bcrypt from 'bcryptjs';
import connectToDatabase from "db/connect-to-database";
import { IAccount } from 'entities/account.entity';
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";
import Encryption from 'utils/encryption/encryption';

async function handler(req: NextApiRequest, token: JWT) {
    const { encrypted_password, master_password, account_id } = req.body;
    const { email } = token;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, "Database connection failed");
    }

    const { User } = db.models;

    const user = await User.findOne({ email });
    if (!user) {
        throw new RequestError(404, "User not found");
    }
    const isVerified = bcrypt.compareSync(master_password, user.password);
    if (!isVerified) {
        throw new RequestError(401, 'Master password is incorrect');
    }

    const account = user.accounts.find((account: IAccount) => account._id === account_id);
    if (!account) {
        throw new RequestError(404, "Account not found");
    }

    const decryptedPassword = Encryption.decrypt(encrypted_password);

    return decryptedPassword;
}

export default normalize(handler);