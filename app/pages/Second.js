/**
 * Created by liao on 2018/1/13.
 */
import React, {Component} from 'react';
import {Text} from 'react-native';
import JPushModule from 'jpush-react-native';
export default class Second extends Component {
    constructor(props) {
        super(props);
    }
    onBackPress(){
        let navigator = this.props.navigator;
        if (navigator != undefined) {
            this.props.navigator.pop();
        } else {
            console.log("finishing second activity");
            JPushModule.finishActivity();
        }
    }
    render() {
        return (
            <Text> Welcome ! </Text>
        );
    }
}

