import React from 'react';
import { Button, Input } from 'react-bootstrap';
import _Math from 'mathjs';

const paramMetals = [
    {
        name: 'Алюминий',
        code: 'Al',
        tepl: 660, // Температура плавления °C
        plt: 2.6989, // Плотность г/см³
        udp: 900, // Удельная теплоёмкость Дж/(г*К)
        koef: 0.9835, // Коэффициент отражения
        tplprovod: 209.3 // теплопроводность металла
    },
    {
        name: 'Бериллий',
        code: 'Be',
        tepl: 1227, // Температура плавления °C
        plt: 1.848, // Плотность г/см³
        udp: 1884, // Удельная теплоёмкость Дж/(г*К)
        koef: 0.475, // Коэффициент отражения
        tplprovod: 178 // теплопроводность металла
    },
    {
        name: 'Железо',
        code: 'Fe',
        tepl: 1533, // Температура плавления °C
        plt: 7.87, // Плотность г/см³
        udp: 460, // Удельная теплоёмкость Дж/(г*К)
        koef: 0.582, // Коэффициент отражения
        tplprovod: 92 // теплопроводность металла
    }
];
const OPTIONS = {
    temperatureRoom: 20,
    maxAccess: 50
};
const parser = _Math.parser();


const MetalList = React.createClass({
    render: function() {
        const createItem = function(item, key) {
            return <option value={key} key={key}>{item.name}</option>;
        };
        return <Input type="select" label="Выберите метал:" placeholder="select" ref="input" onChange={this.props.changeMetal}>
            <option value={null} key={null}></option>
            {this.props.items.map(createItem)}
        </Input>;
    }
});

const InfoMatal = React.createClass({
    render: function() {
        return <form>
            <Input type="number" label="Температура плавления, °C" ref="changeTepl"
                   onChange={this.props.changeTepl}
                   defaultValue={paramMetals[this.props.currentMetal].tepl}
                   value={this.props.value.tepl}
            />
            <Input type="number" label="Плотность, г/см³" ref="changePlt"
                   onChange={this.props.changePlt}
                   defaultValue={paramMetals[this.props.currentMetal].plt}
                   value={this.props.value.plt}
            />
            <Input type="number" label="Удельная теплоёмкость, Дж/(г*К)" ref="changeUdp"
                   onChange={this.props.changeUdp}
                   defaultValue={paramMetals[this.props.currentMetal].udp}
                   value={this.props.value.udp}
            />
            <Input type="number" label="Теплопроводность, ВТ/(М•К)" ref="changeTplprovod"
                   onChange={this.props.changeTplprovod}
                   defaultValue={paramMetals[this.props.currentMetal].tplprovod}
                   value={this.props.value.tplprovod}
            />
            <Input type="number" label="Коэффициент отражения" ref="changeKoef"
                   onChange={this.props.changeKoef}
                   defaultValue={paramMetals[this.props.currentMetal].koef}
                   value={this.props.value.koef}
            />
        </form>;
    }
});

const CalcAngel = React.createClass({
    getInitialState: function() {
        return {
            S: 0,
            needDeg: 0
        };
    },
    changeHeight: function(){
        let S = this.refs.changeHeight.getValue();
        this.setState({
            S: S
        });
    },
    changeDeg: function(){
        let deg = this.refs.changeDeg.getValue();
        this.setState({
            needDeg: deg
        });
    },
    render: function() {

        let t = this.props.R > 0 && this.props.V > 0 ? (2 * (this.props.R/1000) / (this.props.V/60)) : 0;
        let a = this.props.tplprovod / (this.props.udp * this.props.plt);
        let S = parser.eval(a * t + '^(1/2)');
        let D = this.state.S > 0 && S > 0 ? ( S / this.state.S ) : 0;
        let pi = 3 * Math.PI;
        let ath = (parser.eval('2 * 2^(1/2)') / (pi * pi)) * parser.eval(this.props.temperatureRoom + '^(1/4)') * parser.eval(this.props.T + '^(-5/4)');
        let DEG = ath * this.props.T * this.props.T * D * D * (3*Math.PI - 8*D);
        return <div className="hn">
            <div className="hn">
                <div className="gp">
                    <Input type="number" label="Толщина пластины, мм" onChange={this.changeHeight} ref="changeHeight" defaultValue={this.state.S} />
                </div>
                <div className="gp">
                    <Input type="number" label="Нужный угол, град" onChange={this.changeDeg} ref="changeDeg" defaultValue={this.state.needDeg} />
                </div>
            </div>
            <div className="hn">
                1.
                        <span> T` = T<sub>пл</sub> - T<sub>max</sub> - T<sub>0</sub> = {this.props.tepl} - {this.props.maxAccess} - {this.props.temperatureRoom} = <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{this.props.T}</h5></span>
            </div>
            <div className="hn">
                2. <span>t = 2r / V = 2 * {this.props.R} / {_Math.round(this.props.V, 5)} = <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(t, 5)}</h5> c</span>
            </div>
            <div className="hn">
                3. <span>a = λ / (c • ρ) = {this.props.tplprovod} / ({this.props.udp} • {this.props.plt}) = <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(a, 5)}</h5></span>
            </div>
            <div className="hn">
                4. <span>S<sub>1</sub> = (a • t)<sup>1/2</sup> = ({_Math.round(a, 5)} • {_Math.round(t, 5)}) = <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(S, 5)}</h5></span>
            </div>
            <div className="hn">
                5. <span>D = S<sub>1</sub>/S<sub>0</sub> = {_Math.round(S, 5)} / {this.state.S} = <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(D, 5)}</h5></span>
            </div>
            <div className="hn">
                6. <span>a<sub>th</sub> = [ (2 * 2<sup>1/2</sup>)/(3π)<sup>2</sup> ] • T<sub>0</sub><sup>1/4</sup> • T`<sup>-5/4</sup>  =
                [ (2 * 2<sup>1/2</sup>)/(3π)<sup>2</sup> ] • {this.props.temperatureRoom}<sup>1/4</sup> • {this.props.T}<sup>-5/4</sup> =
                <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(ath, 7)}</h5></span>
            </div>
            <div className="hn">
                7. <span>DEG = a<sub>th</sub> • T` • D<sup>2</sup> • (3π - 8D) =
                {_Math.round(ath, 7)} • {this.props.T}<sup>2</sup> • {_Math.round(D, 5)}<sup>2</sup> • (3π - 8 • {_Math.round(D, 5)}) =
                <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{_Math.round(DEG, 5)}</h5></span>
            </div>
            <div className="hn">
                8. <span>Проходов необходимо: <h5 className="statcard-number" style={{
                            display: "inline-block",
                            fontWeight: 800,
                            color: "#1bc98e"
                            }}>{this.state.needDeg > 0 ? Math.ceil(this.state.needDeg / DEG) : 0}</h5></span>
            </div>
        </div>
    }
});


const Main = React.createClass( {
    displayName: 'Main',
    getInitialState: function() {
        return {
            metals: paramMetals,
            currentMetal: null,
            tepl: null,
            plt: null,
            udp: null,
            tplprovod: null,
            maxAccess: OPTIONS.maxAccess,
            currentCalc: 1,
            temperatureRoom: OPTIONS.temperatureRoom,
            r: 0,
            V: 0,
            P: 0
        };
    },
    changeMetal: function(){
        const metalIndex = this.refs.metal.refs.input.getValue();
        this.setState({
            currentMetal: metalIndex,
            tepl: paramMetals[metalIndex].tepl,
            plt: paramMetals[metalIndex].plt,
            udp: paramMetals[metalIndex].udp,
            tplprovod: paramMetals[metalIndex].tplprovod,
            koef: paramMetals[metalIndex].koef
        });
    },
    changeMaxAccess: function(){
        let maxAccess = parseInt(this.refs.inputMaxAccess.getValue());
        if(maxAccess < 0) maxAccess = 0;
        if(this.state.currentMetal != undefined && maxAccess > paramMetals[this.state.currentMetal].tepl/3) maxAccess = paramMetals[this.state.currentMetal].tepl/3;
        this.setState({
            maxAccess: maxAccess
        });
    },
    changeTemperatureRoom: function(){
        let temperatureRoom = parseInt(this.refs.changeTemperatureRoom.getValue());
        if(temperatureRoom < -30) temperatureRoom = -30;
        if(temperatureRoom > 50) temperatureRoom = 50;
        this.setState({
            temperatureRoom: temperatureRoom
        });
    },
    changeRadius:function(){
        let r = this.refs.changeRadius.getValue();
        this.setState({
            r: r
        });
    },
    changePower:function(){
        let P = this.refs.changePower.getValue();
        this.setState({
            P: P
        });
    },
    changeSpeed:function(){
        let V = this.refs.changeSpeed.getValue();
        this.setState({
            V: V
        });
    },
    changeTepl:function(){
        let tepl = this.refs.InfoMatal.refs.changeTepl.getValue();
        this.setState({
            tepl: tepl
        });
    },
    changePlt:function(){
        let plt = this.refs.InfoMatal.refs.changePlt.getValue();
        this.setState({
            plt: plt
        });
    },
    changeUdp:function(){
        let udp = this.refs.InfoMatal.refs.changeUdp.getValue();
        this.setState({
            udp: udp
        });
    },
    changeTplprovod:function(){
        let tplprovod = this.refs.InfoMatal.refs.changeTplprovod.getValue();
        this.setState({
            tplprovod: tplprovod
        });
    },
    changeKoef:function(){
        let koef = this.refs.InfoMatal.refs.changeKoef.getValue();
        this.setState({
            koef: koef
        });
    },
    calcSpeed:function(){
        this.setState({
            currentCalc: 1
        });
    },
    calcPower:function(){
        this.setState({
            currentCalc: 2
        });
    },
    calcRadius:function(){
        this.setState({
            currentCalc: 3
        });
    },
    render: function() {
        let A, T, result = 0, R, V, P;

        if(paramMetals[this.state.currentMetal] != undefined){
            A = _Math.round(_Math.subtract(1, this.state.koef), 4);
            T = this.state.tepl - this.state.maxAccess - this.state.temperatureRoom;
            if(this.state.currentCalc == 1) {
                let down = 0;
                if (this.state.r > 0) {
                    down = parser.eval('(' + this.state.r + '/1000)^3') * parser.eval(Math.PI + '^3') * T * T * this.state.udp * this.state.plt * this.state.tplprovod;
                }
                if (down <= 0) {
                    result = 0;
                }
                else {
                    result = 8 * 60 * A * A * this.state.P * this.state.P / down;
                }
                R = this.state.r;
                P = this.state.P;
                V = result;
            } else if(this.state.currentCalc == 2) {
                let up =
                    ( this.state.r > 0 ? parser.eval('(' + this.state.r + '/1000)^3') : 0) *
                    ( this.state.V > 0 ? this.state.V/60 : 0) *
                    parser.eval(Math.PI + '^3') *
                    T * T *
                    this.state.udp * this.state.plt * this.state.tplprovod;
                let down = 8 * A * A;
                result = down <= 0 || up <= 0 ? 0 : parser.eval(up/down+ '^0.5');

                R = this.state.r;
                P = result;
                V = this.state.V;

            } else if(this.state.currentCalc == 3) {
                let up = 8 * A * A * this.state.P * this.state.P;
                let down =
                    ( this.state.V > 0 ? this.state.V/60 : 0) *
                    parser.eval(Math.PI + '^3') *
                    T * T *
                    this.state.udp * this.state.plt * this.state.tplprovod;
                result = down <= 0 || up <= 0 ? 0 : parser.eval(up/down+ '^(1/3)')*1000;

                R = result;
                P = this.state.P;
                V = this.state.V;
            }
        }

        return (
            <div className="bw">
                <div className="fu">
                    <div className="row bw docs-content">
                        <div className="hc aps">
                            <form>
                                <div className="gp">
                                    <div className="hn">T<sub>0</sub>, Температура помещения, °C</div>
                                    <Input type="number" ref="changeTemperatureRoom" onChange={this.changeTemperatureRoom} defaultValue={OPTIONS.temperatureRoom} />
                                </div>
                                <div className="gp">
                                    <div className="hn">T<sub>max</sub>, Порог ограничение температуры, °C</div>
                                    <Input type="number" ref="inputMaxAccess" onChange={this.changeMaxAccess} defaultValue={OPTIONS.maxAccess} />
                                </div>
                            </form>
                            { paramMetals[this.state.currentMetal] != undefined &&
                                <div>
                            <div className="hn">
                                <h5 className="hn statcard-desc">Расчет температуры нагрева тела</h5>
                                <h5 className="hn statcard-desc">
                                    1.
                                    <span> T` = T<sub>пл</sub> - T<sub>max</sub> - T<sub>0</sub> = {this.state.tepl} - {this.state.maxAccess} - {this.state.temperatureRoom} = <h5 className="statcard-number" style={{
                                        display: "inline-block",
                                        fontWeight: 800,
                                        color: "#1bc98e"
                                        }}>{T}</h5></span>
                                </h5>
                                <h5 className="hn statcard-desc">Поглощательная способность</h5>
                                <h5 className="hn statcard-desc">
                                    2.
                                    <span> A = 1 - R = 1 - {this.state.koef} = <h5 className="statcard-number" style={{
                                        display: "inline-block",
                                        fontWeight: 800,
                                        color: "#1bc98e"
                                        }}>{A}</h5></span>
                                </h5>

                                <div className="hn" style={{marginBottom: "15px"}}>
                                    <div className="gh">
                                        <Button bsStyle={this.state.currentCalc == 1 ? 'primary' : 'default'} onClick={this.calcSpeed} bsSize="small">Расчет скорости</Button>
                                    </div>
                                    <div className="gh">
                                        <Button bsStyle={this.state.currentCalc == 2 ? 'primary' : 'default'} onClick={this.calcPower} bsSize="small">Расчет мощности</Button>
                                    </div>
                                    <div className="gh">
                                        <Button bsStyle={this.state.currentCalc == 3 ? 'primary' : 'default'} onClick={this.calcRadius} bsSize="small">Расчет радиуса</Button>
                                    </div>
                                </div>

                                { this.state.currentCalc == 1 &&
                                    <div>
                                        <div className="hn aom">
                                            <form>
                                                <div className="gp">
                                                    <Input type="number" label="Радиус излучеия, мм" onChange={this.changeRadius} ref="changeRadius" defaultValue={this.state.r} />
                                                </div>
                                                <div className="gp">
                                                    <Input type="number" label="Мощность, ВТ/см&sup2;" onChange={this.changePower} ref="changePower" defaultValue={this.state.P} />
                                                </div>
                                            </form>
                                        </div>

                                        <h5 className="hn statcard-desc">
                                            3.
                                            <span>
                                                V = (8 • A<sup>2</sup> • P<sup>2</sup>) / (r<sup>3</sup> • π<sup>3</sup> • T`<sup>2</sup> • λ • c • ρ) =
                                                (8 • {A}<sup>2</sup> • {this.state.P}<sup>2</sup>) / (({this.state.r}/1000)<sup>3</sup> • {T}<sup>2</sup> • π<sup>3</sup> • {this.state.tplprovod} • {this.state.udp} • {this.state.plt}) =
                                                <br/><h5 className="statcard-number" style={{
                                                display: "inline-block",
                                                fontWeight: 800,
                                                color: "#1bc98e"
                                                }}>{_Math.round(result, 5)}</h5> м / мин
                                            </span>
                                        </h5>
                                    </div>
                                }

                                { this.state.currentCalc == 2 &&
                                <div>
                                    <div className="hn aom">
                                        <form>
                                            <div className="gp">
                                            <Input type="number" label="Радиус излучеия, мм"
                                                   onChange={this.changeRadius} ref="changeRadius"
                                                   defaultValue={this.state.r}/>
                                            </div>
                                            <div className="gp">
                                            <Input type="number" label="Скорость, м / мин"
                                                   onChange={this.changeSpeed} ref="changeSpeed"
                                                   defaultValue={this.state.V}/>
                                            </div>
                                        </form>
                                    </div>

                                    <h5 className="hn statcard-desc">
                                        3.
                                            <span>
                                                P = [(r<sup>3</sup> • π<sup>3</sup> • T`<sup>2</sup> • λ • c • ρ) / (8 • A<sup>2</sup> • V)]<sup>1/2</sup> =
                                                [ ({this.state.r}/1000)<sup>3</sup> • ({this.state.V}/60) • {T}<sup>2</sup> • π<sup>3</sup> • {this.state.tplprovod} • {this.state.udp} • {this.state.plt}) / (8 • {A}<sup>2</sup>)]<sup>1/2</sup> =
                                                <br/><h5 className="statcard-number" style={{
                                                display: "inline-block",
                                                fontWeight: 800,
                                                color: "#1bc98e"
                                                }}>{_Math.round(result, 2)}</h5> ВТ/см&sup2;
                                            </span>
                                    </h5>
                                </div>
                                }
                                { this.state.currentCalc == 3 &&
                                <div>
                                    <div className="hn aom">
                                        <form>
                                            <div className="gp">
                                                <Input type="number" label="Мощность, ВТ/см&sup2;" onChange={this.changePower} ref="changePower" defaultValue={this.state.P} />
                                            </div>
                                            <div className="gp">
                                                <Input type="number" label="Скорость, м / мин"
                                                       onChange={this.changeSpeed} ref="changeSpeed"
                                                       defaultValue={this.state.V}/>
                                            </div>
                                        </form>
                                    </div>

                                    <h5 className="hn statcard-desc">
                                        3.
                                            <span>
                                                r = [(8 • A<sup>2</sup> • P<sup>2</sup>) / (V • π<sup>3</sup> • T`<sup>2</sup> • λ • c • ρ) ]<sup>1/3</sup> =
                                                [(8 • {A}<sup>2</sup> • {this.state.P}<sup>2</sup>) / (({this.state.V}/60) • {T}<sup>2</sup> • π<sup>3</sup> • {this.state.tplprovod}
                                                • {this.state.udp} • {this.state.plt})]<sup>1/3</sup> =
                                                <br/><h5 className="statcard-number" style={{
                                                display: "inline-block",
                                                fontWeight: 800,
                                                color: "#1bc98e"
                                                }}>{_Math.round(result, 1)}</h5> мм <br/>
                                                d =
                                                <h5 className="statcard-number" style={{
                                                display: "inline-block",
                                                fontWeight: 800,
                                                color: "#1bc98e"
                                                }}>{_Math.round(result * 2, 1)}</h5> мм
                                            </span>

                                    </h5>
                                </div>
                                }
                            </div>
                                    <div className="hn">
                                        <h4>Расчет угла</h4>
                                    </div>
                                    <div className="hn">
                                        <CalcAngel
                                            tepl={this.state.tepl}
                                            maxAccess={this.state.maxAccess}
                                            temperatureRoom={this.state.temperatureRoom}
                                            T={T}
                                            R={R}
                                            V={V}
                                            P={P}
                                            plt={this.state.plt}
                                            udp={this.state.udp}
                                            tplprovod={this.state.tplprovod}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="ge aom">
                            <MetalList items={this.state.metals} changeMetal={this.changeMetal} ref="metal" />
                            { paramMetals[this.state.currentMetal] != undefined &&
                                <InfoMatal
                                    ref="InfoMatal"
                                    changeTepl={this.changeTepl}
                                    changePlt={this.changePlt}
                                    changeUdp={this.changeUdp}
                                    changeTplprovod={this.changeTplprovod}
                                    changeKoef={this.changeKoef}
                                    currentMetal={this.state.currentMetal}
                                    value={
                                        {
                                            tepl: this.state.tepl,
                                            plt: this.state.plt,
                                            udp: this.state.udp,
                                            tplprovod: this.state.tplprovod,
                                            koef: this.state.koef
                                        }
                                     }
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} );

module.exports = Main;
