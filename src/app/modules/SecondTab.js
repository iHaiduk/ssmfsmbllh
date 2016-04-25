import React from 'react';
import math from 'mathjs';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import counterpart from 'counterpart';
import formulas from './formulas';

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

        this.modeChange = this.modeChange.bind(this);
        this.powerChange = this.powerChange.bind(this);
        this.speedChange = this.speedChange.bind(this);
        this.radiusChange = this.radiusChange.bind(this);

        this.state = {
            modeDefault: null,
            power: 0,
            speed: 0,
            radius: 0
        };
    }

    modeChange(event, value) {
        this.setState({modeDefault: value});
    }
    powerChange(event, value) {
        this.setState({power: value});
    }
    speedChange(event, value) {
        this.setState({speed: value});
    }
    radiusChange(event, value) {
        this.setState({radius: value});
    }

    render() {
        counterpart.setLocale(this.props.lang);

        let Res1 = this.props.param.tepl - this.props.param.correctTepl - this.props.param.comTemper,
            Res2;
        if (this.props.param.koef) {
            Res2 = math.round(math.eval(`1 - ${this.props.param.koef}`), 4);
        }
        
        let resultSpeed = formulas.speed(this.state.power, this.state.radius / 10, Res1, Res2, this.props.param.koef, this.props.param.a, this.props.param.tplprovod);//formulas.speed(0.2, 1500, 0.06, 0.2, 0.1, 1000);;

        console.log(resultSpeed)

        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <div>
                        <div
                            style={{width: 'calc(33% - 20px)', padding: '3px 0px 0px 20px', display: 'inline-block'}}>
                            <SelectField
                                value={this.state.modeDefault}
                                onChange={this.modeChange}
                                autoWidth={true}
                                floatingLabelText={ _t('example.secondTab4') }
                                style={{width: '100%'}}
                            >
                                <MenuItem value={0} key={0} primaryText={ _t('example.secondTab5') }/>
                                <MenuItem value={1} key={1} primaryText={ _t('example.secondTab6') }/>
                                <MenuItem value={2} key={2} primaryText={ _t('example.secondTab7') }/>
                            </SelectField>
                        </div>
                        <div
                            style={{
                                width: 'calc(57% - 20px)',
                                padding: '3px 0px 0px 20px',
                                display: 'inline-block',
                                marginTop: '1px',
                                position: 'absolute',
                                marginLeft: '10%'
                            }}>
                            <TextField name="tepl" value={this.state.power}
                                       disabled={!(this.state.modeDefault == 1 || this.state.modeDefault == 2)}
                                       floatingLabelText={ _t('example.secondTab8') }
                                       style={{width: 'calc(33% - 30px)', margin: '0 15px'}}
                                       onChange={this.powerChange}/>
                            <TextField name="tepl" value={this.state.speed}
                                       disabled={!(this.state.modeDefault == 0 || this.state.modeDefault == 2)}
                                       floatingLabelText={ _t('example.secondTab9') }
                                       style={{width: 'calc(33% - 30px)', margin: '0 15px'}}
                                       onChange={this.speedChange}/>
                            <TextField name="tepl" value={this.state.radius}
                                       disabled={!(this.state.modeDefault == 1 || this.state.modeDefault == 0)}
                                       floatingLabelText={ _t('example.secondTab10') }
                                       style={{width: 'calc(33% - 30px)', margin: '0 15px'}}
                                       onChange={this.radiusChange}/>
                        </div>

                    </div>
                    <Table
                        fixedHeader={true}
                        selectable={false}
                        multiSelectable={false}
                    >
                        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>{ _t('example.name') }</TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.formula') }</TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.calc') }</TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.tab3') }</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn
                                    style={{whiteSpace: 'normal'}}>{ _t('example.secondTab1') }</TableRowColumn>
                                <TableRowColumn>T` = T<sub>{ _t('example.secondTab2') }</sub> - T<sub>max</sub> - T<sub>0</sub></TableRowColumn>
                                <TableRowColumn>T` = {this.props.param.tepl} - {this.props.param.correctTepl}
                                    - {this.props.param.comTemper}</TableRowColumn>
                                <TableRowColumn>{Res1}°C</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn
                                    style={{whiteSpace: 'normal'}}>{ _t('example.secondTab3') }</TableRowColumn>
                                <TableRowColumn>A = 1 - R</TableRowColumn>
                                <TableRowColumn>A = 1 - {this.props.param.koef}</TableRowColumn>
                                <TableRowColumn>{Res2}</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.secondTab11') }</TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn>{ math.round(resultSpeed.t, 2) } нс</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.secondTab12') }</TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn>{ math.round(resultSpeed.z, 2) } мм</TableRowColumn>
                            </TableRow>
                            { (() => {

                                if (this.state.modeDefault == 0) {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>{ _t('example.secondTab8') }</TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                        </TableRow>
                                    )
                                } else if (this.state.modeDefault == 1) {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>{ _t('example.secondTab9') }</TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn>{ math.round(resultSpeed.v / 100, 2) } м/хв</TableRowColumn>
                                        </TableRow>
                                    )
                                } else if (this.state.modeDefault == 2) {
                                    return (
                                        <TableRow>
                                            <TableRowColumn>{ _t('example.secondTab10') }</TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                            <TableRowColumn></TableRowColumn>
                                        </TableRow>
                                    )
                                }

                            })()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default SecondTab;