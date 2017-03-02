/**
 * Created by igor on 02.03.17.
 */

import mongoose from './connect';

export const prop = {
    code: {
        type: String,
        index: { unique: true },
        lowercase: true,
        trim: true
    },
    tepl: Number, // Температура плавления °C
    plt: Number, // Плотность г/см³
    udp: Number, // Удельная теплоёмкость Дж/(г*К)
    koef: Number, // Коэффициент отражения
    tplprovod: Number // теплопроводность металла
};

export default mongoose.model('Property', prop);