import { Schema, ObjectId, Types } from "mongoose";
import Encryption from "utils/encryption/encryption";

export interface IAccount {
    _id?: string;
    account_label: string;
    username: string;
    password: string;
    account_url: string;
    owner: ObjectId;
}

const accountSchema = new Schema<IAccount>({
    account_label: {
        type: String,
        required: [true, 'Account label is required'],
        minLength: [3, 'Account label must be at least 3 characters long']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be at least 3 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    account_url: {
        type: String,
        default: ''
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Account owner is required']
    }
});

accountSchema.pre('save', function (next) {
    next();
});

export default accountSchema;