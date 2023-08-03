import {Document, Schema, Types, model} from 'mongoose'

interface IMoviesDocument extends Document {
    title: string,
    poster_image: string,
    score: number,
    genre: Types.ObjectId[],
    createdAt: Date,
    updateAt: Date
}

const MoviesSchema = new Schema<IMoviesDocument> ({
    title: {
        type: String,
        required: [true, 'Title input is required'],
        trim: true
    },
    poster_image:{
        type: String,
        required: [true, 'Poster image input is required'],
        unique: true,
        trim: true
    },
    score: {
        type: Number,
        // required: [true, 'Password input is required'],
        trim: true
    },
    genre: {
        type: [{type: Schema.Types.ObjectId, ref: 'genres' }],
        trim: true
    }
    },
    {
    timestamps: true,
    versionKey: false
    }
);

const MoviesModel = model<IMoviesDocument>('Movies', MoviesSchema); //TOFIX: Ojo que no se debería meter mayusculas. Al pasarlo a mongodb quita mayusculas y añade s al final.

export default MoviesModel;