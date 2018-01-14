/**
 * Created by liao on 2018/1/13.
 */
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeAppEventEmitter,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
//import {StackNavigator,TabNavigator} from "react-navigation"
//import Icon from "react-native-vector-icons"
import JPushModule from 'jpush-react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Device from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation';
import SYImagePicker from 'react-native-syan-image-picker'
const { width } = Dimensions.get('window');
/**
 * 默认参数
 */
const defaultOptions = {
    imageCount: 1,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: true,             // 是否允许裁剪，默认false, imageCount 为1才生效
    CropW: ~~(width * 0.6),    // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(width * 0.6),    // 裁剪高度，默认屏幕宽度60%
    isGif: false,              // 是否允许选择GIF，默认false，暂无回调GIF数据
    showCropCircle: false,     // 是否显示圆形裁剪区域，默认false
    circleCropRadius: width/2, // 圆形裁剪半径，默认屏幕宽度一半
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false        // 是否隐藏裁剪区域网格，默认false
};

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
    add()
    {
        SYImagePicker.showImagePicker(defaultOptions, (err, selectedPhotos) => {
                     if (err) {
                         // 取消选择
                         return;
                     }
                     // 选择成功
                 })
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Icon name={"ios-person"} style={{backgroundColor: "rgba(0,0,0,0)"}}
                      size={20} color="#cc0033"/>*/}
                      <Text>444</Text>
                <Icon name={"ios-ribbon"} style={{backgroundColor: "rgba(0,0,0,0)"}}
                      size={20} color="#cc0033"/>
                <Text>{Device.getUniqueID()}</Text>
                <TouchableWithoutFeedback onPress={this.add.bind(this)}>
                <View style={{width:80,height:40,backgroundColor:"#cc0033"}}>

                </View>
                </TouchableWithoutFeedback>

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