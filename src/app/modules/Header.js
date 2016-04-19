import React from 'react';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import {pinkA200} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import FirstTab from './FirstTab';

const _t = Translate.translate;

// load our own translations
counterpart.registerTranslations('ua', require('../../locales/ua'));
counterpart.registerTranslations('en', require('../../locales/en'));
counterpart.registerTranslations('ru', require('../../locales/ru'));
counterpart.setLocale('ua');

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: pinkA200,
    },
});

let main;

class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.setUALang = this.setUALang.bind(this);
        this.setENLang = this.setENLang.bind(this);
        this.setRULang = this.setRULang.bind(this);
        main = this;

        this.state = {
            open: false,
            valueLang: 1
        };
    }

    setUALang() {
        this.setState({valueLang: 1});
        counterpart.setLocale('ua');
    }

    setENLang() {
        this.setState({valueLang: 2});
        counterpart.setLocale('en');
    }

    setRULang() {
        this.setState({valueLang: 3});
        counterpart.setLocale('ru');
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar
                        title={ _t('example.title') }
                        iconElementRight={
                              <IconMenu
                                iconButtonElement={
                                  <IconButton><MoreVertIcon /></IconButton>
                                }
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                value={this.state.valueLang}
                              >
                                <MenuItem primaryText="Українська" onClick={this.setUALang} value={1} />
                                <MenuItem primaryText="English" onClick={this.setENLang} value={2} />
                                <MenuItem primaryText="Русский" onClick={this.setRULang} value={3} />
                              </IconMenu>
                        }
                    />
                    <Tabs>
                        <Tab label={ _t('example.tab0') } className="tab">
                            <FirstTab lang={counterpart.getLocale()} />
                        </Tab>
                        <Tab label={ _t('example.tab1') } className="tab">
                            <div>
                                <h2>222</h2>
                                <p>
                                    This is an example tab.
                                </p>
                                <p>
                                    You can put any sort of HTML or react component in here. It even keeps the component
                                    state!
                                </p>
                            </div>
                        </Tab>
                        <Tab label={ _t('example.tab2') } className="tab">
                            <div>
                                <h2>Tab Two</h2>
                                <p>
                                    This is another example tab.
                                </p>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Main;