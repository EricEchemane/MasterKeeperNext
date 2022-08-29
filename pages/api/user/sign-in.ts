import connectToDatabase from "db/connect-to-database";
import normalize, { RequestError } from "http/response-normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    const { email, name, image, password } = req.body;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, 'Database connection failed');
    }

    const { User } = db.models;

    const user = new User({
        email, name, image, password
    });

    await user.save();

    return user;
}

export default normalize(handler);