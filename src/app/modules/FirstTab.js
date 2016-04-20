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

/*class TableExampleSimple extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            tepl: null,
            plt: null,
            udp: null,
            koef: null,
            tplprovod: null
        };
    }

    render() {

        return (
            <Table
                fixedHeader={true}
                selectable={false}
                multiSelectable={false}
            >
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Свойства</TableHeaderColumn>
                        <TableHeaderColumn>Значение</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    <TableRow>
                        <TableRowColumn>Температура плавления</TableRowColumn>
                        <TableRowColumn><TextField name="tepl" value={this.props.tepl} />°C</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Плотность</TableRowColumn>
                        <TableRowColumn><TextField name="plt" value={this.props.plt} />г/см³</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Удельная теплоёмкость</TableRowColumn>
                        <TableRowColumn><TextField name="udp" value={this.props.udp} />Дж/(г*К)</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Коэффициент отражения</TableRowColumn>
                        <TableRowColumn><TextField name="koef" value={this.props.koef} /></TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>Теплопроводность металла</TableRowColumn>
                        <TableRowColumn><TextField name="tplprovod" value={this.props.tplprovod} />Вт/(м·К)</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
};*/

class FirstTab extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSecondSlider = this.handleSecondSlider.bind(this);
        this.materialChange = this.materialChange.bind(this);
        this.teplChange = this.teplChange.bind(this);
        this.pltChange = this.pltChange.bind(this);
        this.udpChange = this.udpChange.bind(this);
        this.koefChange = this.koefChange.bind(this);
        this.tplprovodChange = this.tplprovodChange.bind(this);

        this.state = {
            secondSlider: 20,
            materialDefault: null,
            materials: materials,
            tepl: '',
            plt: '',
            udp: '',
            koef: '',
            tplprovod: ''
        };
    }

    handleSecondSlider(event, value) {
        this.setState({secondSlider: value});
    }

    teplChange(event, value) {
        this.setState({tepl: value});
    };

    pltChange(event, value) {
        this.setState({plt: value});
    };

    udpChange(event, value) {
        this.setState({udp: value});
    };

    koefChange(event, value) {
        this.setState({koef: value});
    };

    tplprovodChange(event, value) {
        this.setState({tplprovod: value});
    };

    materialChange(event, value) {
        this.setState({
            materialDefault: value,
            tepl: materials[value].tepl,
            plt: materials[value].plt,
            udp: materials[value].udp,
            koef: materials[value].koef,
            tplprovod: materials[value].tplprovod
        });
    }

    render() {
        counterpart.setLocale(this.props.lang);
        materials.forEach((material, i) => {
            items.push();
        });

        let self = this;

        let createItem = function(material, i) {
            return <MenuItem value={i} key={i} primaryText={`${material.name[self.props.lang]}`} />;
        };

        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <div style={{width: 'calc(50% - 30px)', padding: '0 30px 0 0', display: 'inline-block', marginBottom: '-35px'}}>
                        <h4>
                            <span>{_t('example.temperaturaPrimishen')}</span>
                            <strong style={{width: '24px', display: 'inline-block', textAlign: 'center'}}>{this.state.secondSlider}</strong>
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
                    <div style={{width: 'calc(50% - 30px)', padding: '3px 0px 0px 30px', display: 'inline-block', position: 'absolute'}}>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>{ _t('example.meltingTemperature') }</TableRowColumn>
                                <TableRowColumn><TextField name="tepl" value={this.state.tepl} onChange={this.teplChange} />°C</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.density') }</TableRowColumn>
                                <TableRowColumn><TextField name="plt" value={this.state.plt} onChange={this.pltChange} />{ _t('example.gcm') }</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.specificHeat') }</TableRowColumn>
                                <TableRowColumn><TextField name="udp" value={this.state.udp} onChange={this.udpChange} />{ _t('example.djkk') }</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.reflection') }</TableRowColumn>
                                <TableRowColumn><TextField name="koef" value={this.state.koef} onChange={this.koefChange} /></TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>{ _t('example.hermalConductivity') }</TableRowColumn>
                                <TableRowColumn><TextField name="tplprovod" value={this.state.tplprovod} onChange={this.tplprovodChange} />{ _t('example.vtmk') }</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default FirstTab;