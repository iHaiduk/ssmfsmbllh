import React from 'react';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

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
        this.thicknessChange = this.thicknessChange.bind(this);
        this.degreesChange = this.degreesChange.bind(this);
        this.powerChange = this.powerChange.bind(this);
        this.speedChange = this.speedChange.bind(this);

        this.state = {
            speed: 0,
            radius: 0,
            power: 0,
            degrees: null,
            thickness: null
        };
    }

    thicknessChange(event, value) {
        this.setState({thickness: value});
    }

    degreesChange(event, value) {
        this.setState({degrees: value});
    }
    powerChange(event, value) {
        this.setState({power: ~~value});
    }
    speedChange(event, value) {
        this.setState({speed: value});
    }

    render() {
        counterpart.setLocale(this.props.lang);

        let self = this;

        this.props.parent.updatePram = function(speed, radius, power){
            speed = ~~speed / 1000;
            self.setState({speed, radius, power});
        };

        console.log(this.props.parent)

        let angel = formulas.angle(
            this.props.parent.state.materialDefault,
            this.props.param.a || 0,
            parseFloat(this.state.power || 0),
            ~~this.props.param.lth || 0,
            parseFloat(this.state.speed) * 1000 || 0,
            this.props.param.teploem || 0,
            this.props.param.plt || 0,
            this.state.thickness || 0), n = 0;


        if(this.props.parent.FourthTab != undefined) {
            this.props.parent.FourthTab.updateParam(parseFloat(this.state.power), parseFloat(this.state.speed) * 1000, this.state.thickness, this.state.degrees);
        }

        if(this.state.degrees != undefined && parseFloat(this.state.degrees) > 0 && angel > 0) {
            n = parseFloat(this.state.degrees) / angel;
        }
        
        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <div
                        style={{
                                width: 'calc(80% - 40px)',
                                padding: '3px 20px 0px 20px',
                                display: 'inline-block',
                                marginLeft: '10%'
                            }}>
                        <TextField name="tepl" value={this.state.thickness}
                                   floatingLabelText={ _t('example.secondTab17') }
                                   style={{width: 'calc(50% - 30px)', margin: '0 15px'}}
                                   onChange={this.thicknessChange}/>
                        <TextField name="tepl" value={this.state.degrees}
                                   floatingLabelText={ _t('example.secondTab18') }
                                   style={{width: 'calc(50% - 30px)', margin: '0 15px'}}
                                   onChange={this.degreesChange}/>
                    </div>
                    <div
                        style={{
                                width: 'calc(80% - 40px)',
                                padding: '3px 20px 0px 20px',
                                display: 'inline-block',
                                marginLeft: '10%'
                            }}>
                        <TextField name="tepl" value={this.state.power}
                                   floatingLabelText={ _t('example.secondTab13') }
                                   style={{width: 'calc(50% - 30px)', margin: '0 15px'}}
                                   onChange={this.powerChange}/>
                        <TextField name="tepl" value={this.state.speed }
                                   floatingLabelText={ _t('example.secondTab14') }
                                   style={{width: 'calc(50% - 30px)', margin: '0 15px'}}
                                   onChange={this.speedChange}/>
                    </div>
                    <Table
                        fixedHeader={true}
                        selectable={false}
                        multiSelectable={false}
                    >
                        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>{ _t('example.name') }</TableHeaderColumn>
                                <TableHeaderColumn></TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.tab3') }</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn
                                    style={{whiteSpace: 'normal'}}>{ _t('example.secondTab19') }</TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn title={angel ? angel : 0}>{ angel ? math.round(angel, 4) : 0 } { _t('example.grad') }</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn
                                    style={{whiteSpace: 'normal'}}>{ _t('example.secondTab20') }</TableRowColumn>
                                <TableRowColumn></TableRowColumn>
                                <TableRowColumn title={n ? n : 0}>{ n ? Math.ceil(n) : 0 }</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default SecondTab;