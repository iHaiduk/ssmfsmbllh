/**
 * Created by igor on 02.03.17.
 */

import mongoose from './connect';

export default mongoose.model('Mode', {
    type: {
        type: String,
        index: { unique: true },
        lowercase: true,
        trim: true
    },
    data: [Number]
});