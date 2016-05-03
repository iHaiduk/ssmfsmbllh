import React from 'react';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import counterpart from 'counterpart';
import materials from '../material';

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
    },
    items = [];

class FirstTab extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSecondSlider = this.handleSecondSlider.bind(this);
        this.materialChange = this.materialChange.bind(this);
        this.teplChange = this.teplChange.bind(this);
        this.koefChange = this.koefChange.bind(this);
        this.aChange = this.aChange.bind(this);
        this.tplprovodChange = this.tplprovodChange.bind(this);
        this.handlecorrectTepl = this.handlecorrectTepl.bind(this);

        this.state = {
            secondSlider: 20,
            correctTepl: 50,
            materialDefault: null,
            materials: materials,
            tepl: '',
            a: '',
            koef: '',
            tplprovod: ''
        };
    }

    handleSecondSlider(event, value) {
        this.props.parent.setState({comTemper: value});
        this.setState({secondSlider: value});
    }

    handlecorrectTepl(event, value) {
        this.props.parent.setState({correctTepl: value});
        this.setState({correctTepl: value});
    }

    teplChange(event, value) {
        this.props.parent.setState({tepl: value});
        this.setState({tepl: value});
    };

    aChange(event, value) {
        this.props.parent.setState({a: value});
        this.setState({a: value});
    };

    koefChange(event, value) {
        this.props.parent.setState({koef: value});
        this.setState({koef: value});
    };

    tplprovodChange(event, value) {
        this.props.parent.setState({tplprovod: value});
        this.setState({tplprovod: value});
    };

    pltChange(event, value) {
        this.props.parent.setState({plt: value});
        this.setState({plt: value});
    };

    teploemChange(event, value) {
        this.props.parent.setState({teploem: value});
        this.setState({teploem: value});
    };

    materialChange(event, value) {
        const obj = {
            materialDefault: value,
            tepl: materials[value].tepl,
            koef: materials[value].koef,
            a: materials[value].a,
            tplprovod: materials[value].tplprovod,
            plt: materials[value].plt,
            teploem: materials[value].teploem,
        };

        this.props.parent.setState(obj);
        this.setState(obj);
    }

    render() {
        counterpart.setLocale(this.props.lang);
        materials.forEach((material, i) => {
            items.push();
        });

        let self = this;

        let createItem = function (material, i) {
            return <MenuItem value={i} key={i} primaryText={`${material.name[self.props.lang]}`}/>;
        };

        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <div
                        style={{width: 'calc(50% - 30px)', padding: '0 30px 0 0', display: 'inline-block', marginBottom: '-35px'}}>
                        <h4>
                            <span>{_t('example.temperaturaPrimishen')}, <strong>T<sub>0</sub></strong> :</span>
                            <strong
                                style={{width: '24px', display: 'inline-block', textAlign: 'center'}}>{this.state.secondSlider}</strong>
                            <span>°C</span>
                        </h4>
                        <Slider
                            min={-30}
                            max={50}
                            step={1}
                            defaultValue={20}
                            value={this.state.secondSlider}
                            onChange={this.handleSecondSlider.bind(this)}
                        />
                    </div>
                    <div
                        style={{width: 'calc(50% - 30px)', padding: '3px 0px 0px 30px', display: 'inline-block', position: 'absolute'}}>
                        <SelectField
                            value={this.state.materialDefault}
                            onChange={this.materialChange}
                            autoWidth={true}
                            floatingLabelText={ _t('example.needSetMaterial') }
                            style={{width: '100%'}}
                        >
                            {this.state.materials.map(createItem)}
                        </SelectField>
                    </div>
                    <hr />
                    <h4>{ _t('example.metalProperties') }</h4>
                    <Table
                        fixedHeader={true}
                        selectable={false}
                        multiSelectable={false}
                    >
                        <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>{ _t('example.properties') }</TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.values') }</TableHeaderColumn>
                                <TableHeaderColumn>{ _t('example.correct') }</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>{ _t('example.meltingTemperature') }, <strong>T<sub>{ _t('example.secondTab2') }</sub></strong></TableRowColumn>
                                <TableRowColumn><TextField name="tepl" value={this.state.tepl}
                                                           style={{width: '75px'}}
                                                           onChange={this.teplChange}/> <strong>-{this.state.correctTepl}</strong> °C</TableRowColumn>
                                <TableRowColumn>
                                    <Slider
                                        min={10}
                                        max={200}
                                        step={1}
                                        defaultValue={50}
                                        value={this.state.correctTepl}
                                        onChange={this.handlecorrectTepl.bind(this)}
                                    />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.density') }, <strong>a</strong></TableRowColumn>
                                <TableRowColumn><TextField name="a" value={this.state.a}
                                                           style={{width: '75px'}}
                                                           onChange={this.aChange}/>{ _t('example.cm2c') }</TableRowColumn>
                                <TableRowColumn />
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.reflection') }, <strong>R</strong></TableRowColumn>
                                <TableRowColumn><TextField name="koef" value={this.state.koef}
                                                           style={{width: '75px'}}
                                                           onChange={this.koefChange}/></TableRowColumn>
                                <TableRowColumn />
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.hermalConductivity') }</TableRowColumn>
                                <TableRowColumn><TextField name="tplprovod" value={this.state.tplprovod}
                                                           style={{width: '75px'}}
                                                           onChange={this.tplprovodChange}/>{ _t('example.vtmk') }
                                </TableRowColumn>
                                <TableRowColumn />
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.metalDensity') }</TableRowColumn>
                                <TableRowColumn><TextField name="plt" value={this.state.plt}
                                                           style={{width: '75px'}}
                                                           onChange={this.pltChange}/>{ _t('example.djgrad') }
                                </TableRowColumn>
                                <TableRowColumn />
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.heatcapacityMetal') }</TableRowColumn>
                                <TableRowColumn><TextField name="teploem" value={this.state.teploem}
                                                           style={{width: '75px'}}
                                                           onChange={this.teploemChange}/>{ _t('example.gcm') }
                                </TableRowColumn>
                                <TableRowColumn />
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default FirstTab;