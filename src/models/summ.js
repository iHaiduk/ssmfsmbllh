/**
 * Created by igor on 02.03.17.
 */

import mongoose from './connect';
import {prop} from './summ';

export default mongoose.model('Summary', {
    code: {
        type: String,
        index: { unique: true },
        lowercase: true,
        trim: true
    },
    data: [
        {
            ...prop,
            temperature: Number,
            power: Number
        }
    ]
});