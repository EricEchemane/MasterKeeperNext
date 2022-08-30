import connectToDatabase from "db/connect-to-database";
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";

async function handler(req: NextApiRequest, token: JWT) {
    const email = token.email;
    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, "Database connection failed");
    }
    const { User } = db.models;

    const user = await User.findOne({ email });
    if (!user) {
        throw new RequestError(404, "User not found");
    }

    return user;
}

export default normalize(handler);