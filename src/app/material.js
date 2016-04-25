/**
 * Created by igor on 20.04.2016.
 */

export default [
    {
        name: {
            ua: 'Алюміній',
            en: 'Aluminum',
            ru: 'Алюминий'
        },
        tepl: 660, // Температура плавления °C
        koef: 0.9835, // Коэффициент отражения
        tplprovod: 2.18, // теплопроводность металла
        a: 0.9 // температуропроводность
    },
    {
        name:{
            ua: 'Залізо',
            en: 'Iron',
            ru: 'Железо'
        },
        tepl: 1540, // Температура плавления °C
        koef: 0.582, // Коэффициент отражения
        tplprovod: 0.75, // теплопроводность металла
        a: 0.21 // температуропроводность
    },
    {
        name:{
            ua: 'Мідь',
            en: 'Copper',
            ru: 'Медь'
        },
        tepl: 1084, // Температура плавления °C
        koef: 0.27, // Коэффициент отражения http://www.inp.nsk.su/activity/preprints/files/2006_023.pdf 11 стор
        tplprovod: 4.0, // теплопроводность металла
        a: 1.2 // температуропроводность
    },
    {
        name:{
            ua: 'Нікель',
            en: 'Nickel',
            ru: 'Никель'
        },
        tepl: 1455, // Температура плавления °C
        koef: 0.11, // Коэффициент отражения http://www.zao-techno.ru/content/view/26/30/
        tplprovod: 0.92, // теплопроводность металла
        a: 0.24 // температуропроводность
    },
    {
        name:{
            ua: 'Хром',
            en: 'Chromium',
            ru: 'Хром'
        },
        tepl: 1890, // Температура плавления °C
        koef: 0.62, // Коэффициент отражения http://remartspb.ru/infopages/kojefficient_otrazhenija.php
        tplprovod: 0.67, // теплопроводность металла
        a: 0.21 // температуропроводность
    },
    {
        name:{
            ua: 'Нержавіюча сталь',
            en: 'Stainless steel',
            ru: 'Нержавеющая сталь'
        },
        tepl: 1500, // Температура плавления °C
        koef: 0.1, // Коэффициент отражения http://remartspb.ru/infopages/kojefficient_otrazhenija.php
        tplprovod: 0.2, // теплопроводность металла
        a: 0.06 // температуропроводность
    }
];