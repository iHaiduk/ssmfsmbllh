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

        let v = math.eval(`((4096 * (${a} ^ 4) * (${A} ^ 8) * (${P} ^ 8))/( (${math.pi} ^ 12) * (${r} ^ 12) * ( ${_T} ^ 4) * (${tplprovod} ^ 8))) ^ (1/4) `);

        if(String(t) == 'NaN' || String(t) == 'Infinity' || String(z) == 'NaN' || String(z) == 'Infinity' || String(v) == 'NaN' || String(v) == 'Infinity') {
            return {
                t: 0, z: 0, v: 0
            }
        }
        return {t, z, v};
        
    },
    
    power(
        V,
        r,
        T,
        T0,
        A,
        a,
        tplprovod) {

        if(V == undefined || r == undefined || T == undefined || T0 == undefined || A == undefined || a == undefined || tplprovod == undefined) {
            return {
                t: 0, z: 0, v: 0
            }
        }
        let _T = (T - T0);

        V *= 100;

        let p = math.eval(` ( ( (${math.pi} ^ 12) * (${r} ^ 12) * (${tplprovod} ^ 8) * ( ${_T} ^ 4) * ( ${V} ^ 4) ) / (4096 * (${a} ^ 4) * (${A} ^ 8) ) )^ (1/8)`);

        let q = (A * p) / (math.pi * r * r);
        let t1 = (tplprovod * _T) / q;
        let t2 = math.pi / (4 * a);

        let t = (t1 * t1) * t2;

        let z1 = (4 * a * t) / math.pi,
            z = math.eval(`${z1} ^ (1/2)`);

        if(String(t) == 'NaN' || String(t) == 'Infinity' || String(z) == 'NaN' || String(z) == 'Infinity' || String(p) == 'NaN' || String(p) == 'Infinity') {
            return {
                t: 0, z: 0, p: 0
            }
        }
        return {t, z, p};
    },

    radius(
        V,
        P,
        T,
        T0,
        A,
        a,
        tplprovod) {
        
        if(V == undefined || P == undefined || T == undefined || T0 == undefined || A == undefined || a == undefined || tplprovod == undefined) {
            return {
                t: 0, z: 0, v: 0
            }
        }
        
        let _T = (T - T0);
        V *= 100;
        
        let r = math.eval(` ( (4096 * (${a} ^ 4) * (${A} ^ 8) * (${P} ^ 8) ) / ( (${math.pi} ^ 12) * (${tplprovod} ^ 8) * (${_T} ^ 4) * ( ${V} ^ 4) ) ) ^ (1/12) `);

        let q = (A * P) / (math.pi * r * r);
        let t1 = (tplprovod * _T) / q;
        let t2 = math.pi / (4 * a);

        let t = (t1 * t1) * t2;

        let z1 = (4 * a * t) / math.pi,
            z = math.eval(`${z1} ^ (1/2)`);

        if(String(t) == 'NaN' || String(t) == 'Infinity' || String(z) == 'NaN' || String(z) == 'Infinity' || String(r) == 'NaN' || String(r) == 'Infinity') {
            return {
                t: 0, z: 0, r: 0
            }
        }
        return {t, z, r};
    },

    angle(radius, speed, tplprovod, plt, teploem){
        let t = 0,
            l = 0;

        if(radius != undefined && parseFloat(radius) > 0 && speed != undefined && parseFloat(speed) > 0) {
            t = (2 * parseFloat(radius)) / parseFloat(speed);
        }
        if( tplprovod != undefined && parseFloat(tplprovod) > 0 &&
            plt != undefined && parseFloat(plt) > 0 &&
            teploem != undefined && parseFloat(teploem) > 0) {
            l = tplprovod / (plt * teploem);
        }

        let s1 = math.eval(` ( ${l} * ${t} ) ^(1/2) `);
        console.log(l, t, s1)
    }
}