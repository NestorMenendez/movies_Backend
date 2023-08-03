import mongoose from 'mongoose';
import config from '../config/config';

const connect = async () => {
    return await mongoose.connect(config.db.URI);
}

export default connect;