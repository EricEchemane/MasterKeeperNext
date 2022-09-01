import connectToDatabase from "db/connect-to-database";
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";

async function handler(req: NextApiRequest, token: JWT) {
    const { account_id } = req.body;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, 'Database connection failed');
    }
    const { User } = db.models;

    const user = await User.findOne({ email: token.email });
    if (!user) {
        throw new RequestError(404, 'Current user not found');
    }

    user.accounts = user.accounts.filter((account: any) => account._id.toString() !== account_id);

    return user;
}

export default normalize(handler);
