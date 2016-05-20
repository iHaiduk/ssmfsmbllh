import React from 'react';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Tabs, Tab} from 'material-ui/Tabs';

import counterpart from 'counterpart';

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

        this.state = {
        };
    }

    render() {
        counterpart.setLocale(this.props.lang);

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
                                        <TableHeaderColumn>{ _t('example.secondTab15') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab14') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab19') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab20') }</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>1</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>2</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>3</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>4</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>5</TableRowColumn>
                                    </TableRow>
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
                                        <TableHeaderColumn>{ _t('example.secondTab15') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab14') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab19') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab20') }</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>11</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>21</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>31</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>41</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>51</TableRowColumn>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Tab>
                        <Tab label='Варіанти радіусу' className="tab">
                            <Table
                                fixedHeader={true}
                                selectable={false}
                                multiSelectable={false}
                            >
                                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                                    <TableRow>
                                        <TableHeaderColumn>{ _t('example.secondTab13') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab15') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab14') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab19') }</TableHeaderColumn>
                                        <TableHeaderColumn>{ _t('example.secondTab20') }</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody displayRowCheckbox={false}>
                                    <TableRow>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>12</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>22</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>32</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>42</TableRowColumn>
                                        <TableRowColumn style={{whiteSpace: 'normal'}}>52</TableRowColumn>
                                    </TableRow>
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