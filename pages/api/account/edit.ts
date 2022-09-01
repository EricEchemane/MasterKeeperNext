import connectToDatabase from "db/connect-to-database";
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import Encryption from "utils/encryption/encryption";

async function handler(req: NextApiRequest, token: JWT) {
    const {
        account_id,
        master_password,
        account_label,
        username,
        password,
        account_url } = req.body;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, 'Database connection failed');
    }
    const { User } = db.models;

    const user = await User.findOne({ email: token.email });
    if (!user) {
        throw new RequestError(404, 'Current user not found');
    }
    const isVerified = bcrypt.compareSync(master_password, user.password);
    if (!isVerified) {
        throw new RequestError(401, 'Master password is incorrect');
    }

    const account = user.accounts.find((account: any) => account._id.toString() === account_id);
    if (!account) {
        throw new RequestError(404, "Account not found");
    }

    if (!account_label && !username && !account_url && !password) {
        throw new RequestError(400, 'No data provided');
    }

    if (account_label) {
        account.account_label = account_label;
    }
    if (username) {
        account.username = username;
    }
    if (account_url) {
        account.account_url = account_url;
    }
    if (password && password.trim() !== '') {
        account.password = Encryption.encrypt(password);
    }

    await user.save();

    return user;
}

export default normalize(handler, { protect: false });