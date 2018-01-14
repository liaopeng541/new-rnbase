/**
 * Created by liao on 2018/1/13.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeAppEventEmitter
} from 'react-native';
//import {StackNavigator,TabNavigator} from "react-navigation"
//import Icon from "react-native-vector-icons"
import JPushModule from 'jpush-react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Device from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation';
export default class RootNavigator extends Component<{}> {

    initandroidpush()
    {
        // 在收到点击事件之前调用此接口
        JPushModule.notifyJSDidLoad((resultCode) => {
            if (resultCode === 0) {
            }
        });
        JPushModule.addReceiveNotificationListener((map) => {
            console.log("alertContent: " + map.alertContent);
            console.log("extras: " + map.extras);
            // var extra = JSON.parse(map.extras);
            // console.log(extra.key + ": " + extra.value);
        });
        JPushModule.addReceiveOpenNotificationListener((map) => {
            console.log("Opening notification!");
            console.log("map.extra: " + map.key);
            JPushModule.jumpToPushActivity("SecondActivity");
        });
    }
    initiospush()
    {
        this.subscription = NativeAppEventEmitter.addListener(
            'ReceiveNotification',
            'OpenNotification',
            (notification) => console.log(notification)
        );

    }
    desandroidpush()
    {

        console.log("Will clear all notifications");
        JPushModule.clearAllNotifications();
    }
    desiospush()
    {
        this.subscription.remove();
    }
    componentDidMount() {
        SplashScreen.hide();
        Orientation.lockToPortrait();
        if (Platform.OS == "android") {
            this.initandroidpush();
        }else{
            this.initiospush();
        }

    }
    componentWillUnmount() {
        if (Platform.os == "android") {
            this.desandroidpush();
        }else{
            this.desiospush();
        }

    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Icon name={"ios-person"} style={{backgroundColor: "rgba(0,0,0,0)"}}
                      size={20} color="#cc0033"/>*/}
                      <Text>222</Text>
                <Icon name={"ios-ribbon"} style={{backgroundColor: "rgba(0,0,0,0)"}}
                      size={20} color="#cc0033"/>
                <Text>{Device.getUniqueID()}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});