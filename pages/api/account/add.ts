import bcrypt from 'bcryptjs';
import connectToDatabase from "db/connect-to-database";
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";
import Encryption from 'utils/encryption/encryption';

async function handler(req: NextApiRequest, token: JWT) {
    const {
        account_label,
        username,
        password,
        account_url,
        master_password } = req.body;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, 'Database connection failed');
    }
    const { User, Account } = db.models;

    const user = await User.findOne({ email: token.email });
    if (!user) {
        throw new RequestError(404, 'Current user not found');
    }
    const isVerified = bcrypt.compareSync(master_password, user.password);
    if (!isVerified) {
        throw new RequestError(401, 'Master password is incorrect');
    }

    const account = new Account({
        account_label,
        username,
        password: Encryption.encrypt(password),
        account_url,
        owner: user._id
    });

    user.accounts.push(account);

    await user.save();

    return user;
}

export default normalize(handler);