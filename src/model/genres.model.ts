import {Document, Schema, model} from 'mongoose'

interface IGenreDocument extends Document {
    name: string,
    createdAt: Date,
    updateAt: Date
}

const GenreSchema = new Schema<IGenreDocument> ({
    name: {
        type: String,
        required: [true, 'Name input is required'],
        unique: true,
        trim: true
    },
},
    {
    timestamps: true,
    versionKey: false
    }
);

const GenreModel = model<IGenreDocument>('genre', GenreSchema);

export default GenreModel;