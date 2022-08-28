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
        required: [true, 'Account label is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    account_url: {
        type: String,
        default: undefined
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'Account owner is required']
    }
});

accountSchema.pre('save', function (next) {
    this.password = Encryption.encrypt(this.password);
    next();
});

export default accountSchema;