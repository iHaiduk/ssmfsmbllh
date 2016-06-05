import React from 'react';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import counterpart from 'counterpart';
import formulas from './formulas';
import math from 'mathjs';

counterpart.registerTranslations('ua', require('../../locales/ua'));
counterpart.registerTranslations('en', require('../../locales/en'));
counterpart.registerTranslations('ru', require('../../locales/ru'));

const _t = Translate.translate;

const style = {
    height: 'calc(100vh - 140px)',
    width: 'calc(100% - 50px)',
    margin: '15px 25px',
    textAlign: 'left',
    display: 'block',
    padding: '5px 15px',
    overflowY: 'auto'
};

class SecondTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateParam = this.updateParam.bind(this);

        this.state = {
            power: 0,
            speed: 0,
            thickness: 0,
            degrees: 0
        };
    }

    updateParam(power, speed, thickness, degrees) {
        this.setState({power, speed, thickness, degrees});
    }

    render() {
        counterpart.setLocale(this.props.lang);

        let Power = [], Speed = [];
        console.log(12121212121, this.props.parent.state.materialDefault)

        if(this.state.power > 0) {
            for (let i = 0; i < 5; i++) {
                let power = parseFloat(this.state.power);
                power -= power / 10 * (5 - i);
                let angel = formulas.angle(
                        this.props.parent.state.materialDefault,
                        this.props.param.a || 0,
                        parseFloat(power || 0),
                        ~~this.props.param.lth || 0,
                        parseFloat(this.state.speed) * 1000 || 0,
                        this.props.param.teploem || 0,
                        this.props.param.plt || 0,
                        this.state.thickness || 0) * 1000, n = 0;
                Power.push(
                    <TableRow>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~power, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(this.state.speed/1000, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
                    </TableRow>
                );
            }
        }

        let angel = formulas.angle(
                this.props.parent.state.materialDefault,
                this.props.param.a || 0,
                parseFloat(this.state.power || 0),
                ~~this.props.param.lth || 0,
                parseFloat(this.state.speed) * 1000 || 0,
                this.props.param.teploem || 0,
                this.props.param.plt || 0,
                this.state.thickness || 0) * 1000;
        Power.push(
            <TableRow>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~this.state.power, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(this.state.speed/1000, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
            </TableRow>);

        if(this.state.power > 0) {
            for (let i = 0; i < 8; i++) {
                let power = parseFloat(this.state.power);
                power += power / 7 * (i + 1);
                let angel = formulas.angle(
                        this.props.parent.state.materialDefault,
                        this.props.param.a || 0,
                        parseFloat(power || 0),
                        ~~this.props.param.lth || 0,
                        parseFloat(this.state.speed) * 1000 || 0,
                        this.props.param.teploem || 0,
                        this.props.param.plt || 0,
                        this.state.thickness || 0) * 1000, n = 0;
                Power.push(
                    <TableRow>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~power, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(this.state.speed/1000, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
                    </TableRow>
                );
            }
        }



        if(this.state.speed > 0) {
            for (let i = 0; i < 5; i++) {
                let speed = parseFloat(this.state.speed);
                speed -= speed / 10 * (5 - i);
                let angel = formulas.angle(
                        this.props.parent.state.materialDefault,
                        this.props.param.a || 0,
                        parseFloat(this.state.power || 0),
                        ~~this.props.param.lth || 0,
                        speed * 1000 || 0,
                        this.props.param.teploem || 0,
                        this.props.param.plt || 0,
                        this.state.thickness || 0) * 1000, n = 0;
                Speed.push(
                    <TableRow>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~this.state.power, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(speed/1000, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
                    </TableRow>
                );
            }
        }

        angel = formulas.angle(
                this.props.parent.state.materialDefault,
                this.props.param.a || 0,
                parseFloat(this.state.power || 0),
                ~~this.props.param.lth || 0,
                parseFloat(this.state.speed) * 1000 || 0,
                this.props.param.teploem || 0,
                this.props.param.plt || 0,
                this.state.thickness || 0) * 1000;
        Speed.push(
            <TableRow>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~this.state.power, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(this.state.speed/1000, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
            </TableRow>);

        if(this.state.speed > 0) {
            for (let i = 0; i < 8; i++) {
                let speed = parseFloat(this.state.speed);
                speed += speed / 10 * (i + 1);
                let angel = formulas.angle(
                        this.props.parent.state.materialDefault,
                        this.props.param.a || 0,
                        parseFloat(this.state.power || 0),
                        ~~this.props.param.lth || 0,
                        speed * 1000 || 0,
                        this.props.param.teploem || 0,
                        this.props.param.plt || 0,
                        this.state.thickness || 0) * 1000, n = 0;
                Speed.push(
                    <TableRow>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(~~this.state.power, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(speed/1000, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ math.round(angel, 4) }</TableRowColumn>
                        <TableRowColumn style={{whiteSpace: 'normal'}}>{ this.state.degrees ? math.ceil(this.state.degrees / angel) : 0 }</TableRowColumn>
                    </TableRow>
                );
            }
        }

        /*let angel = formulas.angle(
            this.props.param.a,
            ~~this.state.power,
            ~~this.props.param.lth,
            parseFloat(this.state.speed) * 1000,
            this.props.param.teploem,
            this.props.param.plt,
            this.state.thickness), n = 0;*/

        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <Tabs className="viewTab">
                        <Tab label='Варіанти потужності' className="tab">
                            <Table
                                fixedHeader={true}
                                selectable={false}
                                multiSelectable={false}
                            >
                                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>{ _t('example.secondTab13') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab14') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab19') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab20') }</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                        {
                                            Power
                                        }
                                </TableBody>
                            </Table>
                        </Tab>
                        <Tab label='Варіанти швидкості' className="tab">
                            <Table
                                fixedHeader={true}
                                selectable={false}
                                multiSelectable={false}
                            >
                                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>{ _t('example.secondTab13') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab14') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab19') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab20') }</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    {
                                        Speed
                                    }
                                </TableBody>
                            </Table>
                        </Tab>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

export default SecondTab;