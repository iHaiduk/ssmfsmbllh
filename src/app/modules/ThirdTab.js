import React from 'react';
import Translate from 'react-translate-component';
import Paper from 'material-ui/Paper';

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

                </Paper>
            </div>
        );
    }
}

export default SecondTab;