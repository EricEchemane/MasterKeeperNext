import mongoose from 'mongoose';
import userSchema from 'entities/user.entity';
import accountSchema from 'entities/account.entity';

let database: typeof mongoose | null = null;

export default async function connectToDatabase(): Promise<typeof mongoose | null> {
    try {
        if (database) {
            return database;
        }
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set');
        }
        if (!mongoose.models.User) mongoose.model('User', userSchema);
        if (!mongoose.models.Account) mongoose.model('Account', accountSchema);
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        database = connection;
        // console.log('connection created');

        return database;
    } catch (error) {
        console.error('Can not connect to database', error);
        return null;
    }
}