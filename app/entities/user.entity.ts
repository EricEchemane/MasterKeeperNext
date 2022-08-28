import isValidEmail from "utils/email-validator";
import bcrypt from 'bcryptjs';
import { Schema } from "mongoose";
import accountSchema from "./account.entity";

export interface IUser {
    _id?: string;
    email: string;
    name: string;
    image: string;
    password: string;
    createdOn: Date;
    updatedOn: Date;
    accounts: (typeof accountSchema)[];
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: isValidEmail,
            message: 'Email is invalid'
        }
    },
    image: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    accounts: {
        type: [accountSchema],
        default: undefined
    }
});

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

export default userSchema;