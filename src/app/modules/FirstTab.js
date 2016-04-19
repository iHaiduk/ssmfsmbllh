import React from 'react';
import Translate from 'react-translate-component';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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

class FirstTab extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSecondSlider = this.handleSecondSlider.bind(this);

        this.state = {
            secondSlider: 20
        };
    }

    handleSecondSlider(event, value) {
        this.setState({secondSlider: value});
    }

    render() {
        counterpart.setLocale(this.props.lang);
        return (
            <div>
                <Paper style={style} zDepth={2}>
                    <div style={{width: 'calc(50% - 30px)', padding: '0 30px 0 0', display: 'inline-block'}}>
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
                    <TextField
                        floatingLabelText={ _t('example.temperaturaPrimishen') }
                    />
                </Paper>
            </div>
        );
    }
}

export default FirstTab;