import {Document, Schema, Types, model} from 'mongoose'

interface IUserDocument extends Document {
    name: string,
    email: string,
    movies: Types.ObjectId[],
    password: string,
    createdAt: Date,
    updateAt: Date
}

const UserSchema = new Schema<IUserDocument> ({
    name: {
        type: String,
        required: [true, 'Name input is required'],
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email input is required'],
        unique: true,
        trim: true
    },
    movies: {
        type: [{type: Schema.Types.ObjectId, ref: 'Movies'}],
        required: [true, 'Movies input is required'],
    },
    password: {
        type: String,
        required: [true, 'Password input is required'],
        trim: true
    },
},
    {
    timestamps: true,
    versionKey: false
    }
);

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;