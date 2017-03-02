/**
 * Created by igor on 02.03.17.
 */

import mongoose from './connect';

export default mongoose.model('Localization', {
    key: {
        type: String,
        index: { unique: true },
        lowercase: true,
        trim: true
    },
    ru: String,
    en: String,
    ua: String
});