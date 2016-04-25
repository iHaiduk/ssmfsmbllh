/**
 * Created by igor on 24.04.2016.
 */
import math from 'mathjs';

export default {
    speed(
        P,
        r,
        T,
        T0,
        A,
        a,
        tplprovod){

        if(P == undefined || r == undefined || T == undefined || T0 == undefined || A == undefined || a == undefined || tplprovod == undefined) {
            return {
                t: 0, z: 0, v: 0
            }
        }


        let _T = (T - T0);

        let q = (A * P) / (math.pi * r * r);
        let t1 = (tplprovod * _T) / q;
        let t2 = math.pi / (4 * a);

        let t = (t1 * t1) * t2;

        let z1 = (4 * a * t) / math.pi,
            z = math.eval(`${z1} ^ (1/2)`);

        let v1 = A * P,
            v2 = math.pi * tplprovod,
            v2_t = math.eval(`${_T} ^ (3/2)`),
            v3 = 8 * a * v2_t,
            v3_t = math.eval(`${z} ^ (3/2)`),
            v4 = math.pi * T * v3_t,
            v5 = math.eval(`${v1/v2} ^ (1/2)`),
            v = (v5 * v3) / v4;

        console.log()

        if(String(t) == 'NaN' || String(t) == 'Infinity' || String(z) == 'NaN' || String(z) == 'Infinity' || String(v) == 'NaN' || String(v) == 'Infinity') {
            return {
                t: 0, z: 0, v: 0
            }
        }
        return {t, z, v};
        
    }
}