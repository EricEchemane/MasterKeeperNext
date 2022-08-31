import isValidEmail from "utils/email-validator";
import { Schema } from "mongoose";
import accountSchema, { IAccount } from "./account.entity";

export interface IUser {
    _id?: string;
    email: string;
    name: string;
    image: string;
    password: string;
    createdOn?: Date;
    updatedOn?: Date;
    accounts: IAccount[];
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
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
        type: [accountSchema]
    }
}, {
    statics: {
        findByEmail: function (email: string) {
            return this.findOne({ email });
        }
    }
});

userSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    next();
});

export default userSchema;